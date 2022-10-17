import axios from 'axios';
import { decodeBase64Url } from './utils.js';
import cliProgress from 'cli-progress';
import pLimit from 'p-limit';
const ARWEAVE_BASE_URL = 'https://arweave.net';
const DEFAULT_CHUNK_SIZE = BigInt(262144); //256KiB
/**
 * Fetches the transaction size and offset of the last chunk
 * @param {TransactionID} transactionID - ID of the transaction
 * @return the size of the transaction and the offset of the last chunk
 */
async function fetchOffsetInformation(transactionID) {
    const offsetUrl = `${ARWEAVE_BASE_URL}/tx/${transactionID}/offset`;
    try {
        const offsetResponse = (await axios.get(offsetUrl)).data;
        const transactionSize = BigInt(offsetResponse.size);
        const offset = BigInt(offsetResponse.offset);
        return { transactionSize, offset };
    }
    catch (error) {
        throw new Error(`${error.message}. Is the transaction id "${transactionID}" correct?`);
    }
}
/**
 * Downloads all the transaction data for the given ID.
 * @param {TransactionID} transactionID - ID of the transaction
 * @return  Uint8Array of the transaction data
 */
export async function fetchTransactionData(transactionID, concurrencyLimit) {
    // 1. we start at the beginning of the transaction
    let { transactionSize, offset } = await fetchOffsetInformation(transactionID);
    let currentIndex = Number(transactionSize / DEFAULT_CHUNK_SIZE);
    let transactionData = [];
    const getChunk = async (offset, index) => {
        const response = await axios.get(`${ARWEAVE_BASE_URL}/chunk/${offset}`);
        transactionData[index] = decodeBase64Url(response.data.chunk);
        progressBar.increment();
    };
    console.log(`Downloading ${transactionSize} bytes of data...`);
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(currentIndex + 1, 0);
    // 2. The End chunk is probably not 256KiB big, thus we handle it here seperatly
    await getChunk(offset, currentIndex);
    offset -= transactionSize % DEFAULT_CHUNK_SIZE;
    // 3. Fetch every leftover chunk
    const limit = pLimit(concurrencyLimit);
    let fetches = [];
    while (--currentIndex >= 0) {
        fetches.push(limit((offset, currentIndex) => getChunk(offset, currentIndex), offset, currentIndex));
        offset -= DEFAULT_CHUNK_SIZE;
    }
    // 4. Wait for all promises to resolve
    try {
        await Promise.all(fetches);
    }
    catch (error) {
        throw new Error("Not all fetches could be resolved: " + error.message);
    }
    // 5. Concatinate all chunk arrays together
    const dataString = Buffer.concat(transactionData);
    if (BigInt(dataString.length) !== transactionSize) {
        throw (new Error(`Invalid size of fetched data. 
        Received ${dataString.length} but should be ${transactionSize}`));
    }
    progressBar.stop();
    return dataString;
}
/**
 * Fetches also the transaction data, but somehow this doesn't work for big sizes
 * @param {TransactionID} transactionID - ID of the transaction
 * @return Uint8Array of the transaction data
 */
export async function fetchAllData(transactionID) {
    const response = await axios.get(`https://arweave.net/tx/${transactionID}/data`, {
        method: 'get'
    });
    return decodeBase64Url(response.data);
}

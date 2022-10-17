import yargs from "yargs";
import { TransactionID } from "./transactionLoader.js";
import { FileEncoding, isValidFileEncoding } from "./utils.js";


const DEFAULT_CONCURRENCY_LIMIT = Infinity;
const DEFAULT_FILE_ENCODING = FileEncoding.Base64Url;

const argv = await yargs(process.argv.slice(2)).option(
    'encoding', {
    alias: 'e',
    description: `Possible encodings:  ${Object.values(FileEncoding)}. Default "base64url"`,
    demandOption: false,
    type: 'string'
}).option(
    'transaction', {
    alias: 't',
    description: "Transaction id on Arweave",
    demand: true,
    type: 'string'
}).option(
    'output', {
    alias: 'o',
    description: "Output filename",
    demand: true,
    type: 'string'
}).option(
    'concurrency', {
    alias: 'c',
    description: "Promise concurrency limit. Default: Infinity",
    demand: false,
    type: 'number'
}).argv;

export type Args = {
    encoding: FileEncoding,
    transactionID: TransactionID,
    fileName: string,
    concurrencyLimit: number
}


/**
 * Get all console arguments
 * @return The file encoding, transaction id and the output fileName
 */
export function getArgs(): Args {
    const args: Args = {
        encoding: argv.encoding as FileEncoding ?? DEFAULT_FILE_ENCODING,
        transactionID: argv.transaction,
        fileName: argv.output,
        concurrencyLimit: argv.concurrency ?? DEFAULT_CONCURRENCY_LIMIT
    };

    if (!isValidFileEncoding(args.encoding)) {
        throw new Error(`Invalid file encoding: ${args.encoding}`)
    }

    console.table(args);
    return args;
}
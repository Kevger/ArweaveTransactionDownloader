import { fetchTransactionData } from "./transactionLoader.js";
import { FileEncoding, saveToFile } from "./utils.js";
import { Args, getArgs } from "./argv.js";

try {
    const args: Args = getArgs();
    const transactionData = await fetchTransactionData(args.transactionID, args.concurrencyLimit);
    saveToFile(args.fileName, transactionData, args.encoding as FileEncoding);
} catch (error) {
    console.error(error.message);
}



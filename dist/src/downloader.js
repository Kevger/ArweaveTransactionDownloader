import { fetchTransactionData } from "./transactionLoader.js";
import { saveToFile } from "./utils.js";
import { getArgs } from "./argv.js";
try {
    const args = getArgs();
    const transactionData = await fetchTransactionData(args.transactionID, args.concurrencyLimit);
    saveToFile(args.fileName, transactionData, args.encoding);
}
catch (error) {
    console.error(error.message);
}

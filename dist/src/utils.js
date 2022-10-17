import fs from 'fs';
/**
 * Decodes input string in base64url into a Buffer object
 * @param {string} input - Input base64url string
 * @return Buffer object which can be used to work with the individual bytes
 */
export const decodeBase64Url = (input) => {
    return Buffer.from(input, 'base64url');
};
export var FileEncoding;
(function (FileEncoding) {
    FileEncoding["UTF8"] = "utf8";
    FileEncoding["Base64"] = "base64";
    FileEncoding["Base64Url"] = "base64url";
    FileEncoding["Hex"] = "hex";
})(FileEncoding || (FileEncoding = {}));
export function isValidFileEncoding(fileEncoding) {
    return Object.values(FileEncoding).some(v => v === fileEncoding);
}
export function saveToFile(fileName, data, fileEncoding) {
    const encodedData = data.toString(fileEncoding);
    fs.writeFile(fileName, encodedData, (err) => {
        if (err)
            return console.error(err);
        console.log(`Data saved in ${fileName}`);
    });
}

import fs from 'fs';

/**
 * Decodes input string in base64url into a Buffer object
 * @param {string} input - Input base64url string
 * @return Buffer object which can be used to work with the individual bytes
 */
export const decodeBase64Url = (input: string): Buffer => {
    return Buffer.from(input, 'base64url');
};

export enum FileEncoding {
    UTF8 = "utf8",
    Base64 = "base64",
    Base64Url = "base64url",
    Hex = "hex"
}

export function isValidFileEncoding(fileEncoding: string): boolean {
    return Object.values(FileEncoding).some(v => v === fileEncoding);
}

export function saveToFile(fileName: string, data: Buffer, fileEncoding: FileEncoding): void {
    const encodedData = data.toString(fileEncoding);
    fs.writeFile(fileName, encodedData, (err) => {
        if (err) return console.error(err);
        console.log(`Data saved in ${fileName}`);
    });
}

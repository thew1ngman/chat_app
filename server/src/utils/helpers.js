import fs from 'fs/promises';

/**
 * Reads a file from disk. NOTE: Use absolute paths.
 * @param {string} filepath
 */
export async function readFile(filepath) {
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data);
};

/**
 * @param {Object} queryData
 * @param {string} type
 * @param {string} message
 */
export function responseData(queryData, type, message) {
    return [queryData, {type: type, message: message}];
}
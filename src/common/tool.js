import exp from 'constants';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

/**
 * Checks if a directory exists at the specified path.
 * 
 * @param {string} path - The path to the directory.
 * @returns {boolean} - Returns true if the directory exists, false otherwise.
 */
function existDir(path) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

/**
 * Checks if a file exists at the specified path.
 * 
 * @param {string} path - The path to the file.
 * @returns {boolean} - Returns true if the file exists and is a regular file, otherwise returns false.
 */
function existFile(path) {
  return fs.existsSync(path) && fs.lstatSync(path).isFile();
}

/**
 * Creates a directory recursively if it doesn't exist.
 * @param {string} dirname - The directory path to create.
 * @returns {boolean} Returns true if the directory is created successfully, false otherwise.
 */
function createDir(dirname) {
    if (existDir(dirname)) {
        return true;
    }

    const parentDir = path.dirname(dirname);
    if (parentDir !== dirname) {
        if (createDir(parentDir)) {
            fs.mkdirSync(dirname);
            return true;
        }
    }

    return false;
}

/**
 * Creates a file at the specified file path.
 * @param {string} filePath - The path of the file to be created.
 * @param {boolean} [append=false] - Optional. Specifies whether to append to an existing file. Default is false.
 */
function createFile(filePath, append = false) {
    const dirname = path.dirname(filePath);
    createDir(dirname);
    if (append) {
        fs.appendFileSync(filePath, '');
    } else {
        fs.writeFileSync(filePath, '');
    }
}

/**
 * Generates a unique code.
 * @returns {string} The generated unique code.
 */
function generateUniqueCode() {
    return v4();
}

/**
 * Generates a random secret password of the specified length.
 * 
 * @param {number} length - The length of the password to generate.
 * @returns {string} The generated password.
 */
function generateSecret(length) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const allChars = uppercaseChars + lowercaseChars + numberChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

export {
    existDir,
    existFile,
    createDir,
    createFile,
    generateUniqueCode,
    generateSecret
};
  
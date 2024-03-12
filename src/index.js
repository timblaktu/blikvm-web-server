import Logger from "./log/logger.js";
import {
    existFile,
    createFile,
    generateUniqueCode,
    generateSecret
} from "./common/tool.js"
import fs from 'fs';
import HttpServer from "./http_server/http_server.js";

const logger = new Logger();

createSecretFile();

const httpServer = new HttpServer();
httpServer.startService();

/**
 * Creates or updates a secret file with a unique code, secret key, and empty OTP.
 */
function createSecretFile() {
    let keyLength = 32;
    const {
        other
    } = JSON.parse(fs.readFileSync('config/app.json', 'utf8'));
    if (!existFile(other.secretFile)) {
        createFile(other.secretFile);
        const data = {
            id: generateUniqueCode(),
            key: generateSecret(keyLength),
            otp: ''
        };
        fs.writeFileSync(other.secretFile, JSON.stringify(data));
        logger.info(`Secret file created at ${other.secretFile}`);
    }
}
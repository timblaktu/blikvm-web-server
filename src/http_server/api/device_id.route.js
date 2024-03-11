import fs from 'fs';
import {
    nextTick
} from 'process';

/**
 * Handles the API request for retrieving the device ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
function apiFunc(req, res, next) {
    try {
        const {
            other
        } = JSON.parse(fs.readFileSync('config/app.json', 'utf8'));
        const data = JSON.parse(fs.readFileSync(other.secretFile, 'utf8'));
        res.json({
            id: data.id,
            msg: 'successful'
        });
    } catch (err) {
        next(err);
    }
}

export default apiFunc;
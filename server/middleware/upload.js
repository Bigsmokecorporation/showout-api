import CONSTANTS from '../util/CONSTANTS.js';
import multer from 'multer';
const storage = multer.memoryStorage({
    limits: {
        fileSize: CONSTANTS.MAX_FILE_UPLOAD
    }
});

export default multer({
    storage,
    limits: {
        fileSize: CONSTANTS.MAX_FILE_UPLOAD
    }
});

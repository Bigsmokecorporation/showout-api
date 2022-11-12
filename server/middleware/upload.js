import CONSTANTS from '../util/Constants.js';
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

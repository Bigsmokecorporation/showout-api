import multer from 'multer';
import constants from '../util/constants.js';
const storage = multer.memoryStorage({
    limits: {
        fileSize: constants.MAX_FILE_UPLOAD
    }
});

export default multer({
    storage,
    limits: {
        fileSize: constants.MAX_FILE_UPLOAD
    }
});

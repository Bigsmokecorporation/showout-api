import {Router} from 'express';
import CardController from "../services/card/CardController.js";
import Auth from "../middleware/auth.js";
import Upload from "../middleware/upload.js";

const cardRoutes = Router();

cardRoutes.post("/create", Auth, Upload.fields([
    {name: 'media', maxCount: 1}, {name: 'media_demo', maxCount: 1}, {name: 'cover_art', maxCount: 1}
]), CardController.create);

export default cardRoutes;

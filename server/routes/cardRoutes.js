import {Router} from 'express';
import CardController from "../services/card/CardController.js";
import Auth from "../middleware/auth.js";
import Upload from "../middleware/upload.js";

const cardRoutes = Router();

cardRoutes.post("/create", Auth, Upload.fields([
    {name: 'media', maxCount: 1}, {name: 'media_demo', maxCount: 1}, {name: 'cover_art', maxCount: 1}
]), CardController.create);
cardRoutes.put("/update/:id", CardController.update);
cardRoutes.get("/genres", CardController.genres);
cardRoutes.get("/list", CardController.list);
cardRoutes.get("/random", Auth, CardController.random);
cardRoutes.get("/search", Auth, CardController.search);
cardRoutes.get("/:id", CardController.get);

cardRoutes.get("/like/:id", CardController.likeCard);
cardRoutes.get("/dislike/:id", CardController.disLikeCard);
cardRoutes.get("/favorite/:id", CardController.favoriteCard);
cardRoutes.get("/unfavorite/:id", CardController.unFavoriteCard);
cardRoutes.get("/play/:id", CardController.recordCardPlay);



export default cardRoutes;

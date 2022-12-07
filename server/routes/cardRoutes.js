import {Router} from 'express';
import CardController from "../services/card/CardController.js";
import Auth from "../middleware/auth.js";
import Upload from "../middleware/upload.js";

const cardRoutes = Router();

cardRoutes.post("/create", Auth, Upload.fields([
    {name: 'media', maxCount: 1}, {name: 'media_demo', maxCount: 1}, {name: 'cover_art', maxCount: 1}
]), CardController.create);
cardRoutes.put("/update/:id", Auth, CardController.update);
cardRoutes.get("/genres", CardController.genres);
cardRoutes.get("/list", Auth, CardController.list);
cardRoutes.get("/random", Auth, CardController.random);
cardRoutes.get("/search", Auth, CardController.search);
cardRoutes.get("/popular", Auth, CardController.popular);

cardRoutes.get("/like/:id", Auth, CardController.likeCard);
cardRoutes.get("/dislike/:id", Auth, CardController.disLikeCard);
cardRoutes.get("/favorite/:id", Auth, CardController.favoriteCard);
cardRoutes.get("/unfavorite/:id", Auth, CardController.unFavoriteCard);
cardRoutes.get("/play/:id", Auth, CardController.recordCardPlay);

cardRoutes.get("/:id", Auth, CardController.get);

export default cardRoutes;

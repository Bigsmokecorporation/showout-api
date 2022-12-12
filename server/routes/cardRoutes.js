import {Router} from 'express';
import CardController from "../services/card/CardController.js";
import {Auth} from "../middleware/auth.js";
import Upload from "../middleware/upload.js";

const cardRoutes = Router();

cardRoutes.post("/create", Auth, Upload.fields([
    {name: 'media', maxCount: 1}, {name: 'media_demo', maxCount: 1}, {name: 'cover_art', maxCount: 1}
]), CardController.create);
cardRoutes.put("/update/:id", Auth, CardController.update);
cardRoutes.get("/genres", CardController.genres);
cardRoutes.get("/list", CardController.list);
cardRoutes.get("/random", Auth, CardController.random);
cardRoutes.get("/search", CardController.search);
cardRoutes.get("/popular", CardController.popularCards);
cardRoutes.get("/trending", CardController.trendingCards);
cardRoutes.get("/recently-played", Auth, CardController.playedCards);

cardRoutes.get("/like/:id", Auth, CardController.likeCard);
cardRoutes.get("/dislike/:id", Auth, CardController.disLikeCard);
cardRoutes.get("/favorite/:id", Auth, CardController.favoriteCard);
cardRoutes.get("/unfavorite/:id", Auth, CardController.unFavoriteCard);
cardRoutes.get("/play/:id", Auth, CardController.recordCardPlay);

cardRoutes.get("/:id", Auth, CardController.get);

export default cardRoutes;

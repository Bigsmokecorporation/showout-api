import { Router } from 'express';
import PlaylistController from "../services/playlist/PlaylistController.js";
import {Auth, AdminAuth} from "../middleware/auth.js";
const playlistRoutes = Router();

playlistRoutes.post("/join", Auth, PlaylistController.requestToJoin);
playlistRoutes.post("/create", AdminAuth, PlaylistController.create);
playlistRoutes.post("/add-tracks/:id", AdminAuth, PlaylistController.addTracks);

export default playlistRoutes;

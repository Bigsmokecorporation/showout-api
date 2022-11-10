import { Router } from 'express';
import UserController from "../services/user/UserController.js";
import Auth from "../middleware/auth.js";
const userRoutes = Router();

userRoutes.post("/create", UserController.create);

userRoutes.post("/verify", UserController.create);

userRoutes.put("/update", Auth, UserController.update);

userRoutes.get("/:id", Auth, UserController.get);

export default userRoutes;
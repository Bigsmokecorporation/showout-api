import { Router } from 'express';
import UserController from "../services/user/UserController.js";
import Auth from "../middleware/auth.js";
import Upload from "../middleware/upload.js";
const userRoutes = Router();

userRoutes.post("/create", UserController.create);
userRoutes.put("/update", Auth, Upload.fields([{name: 'photo', maxCount: 1}]), UserController.update);
userRoutes.get("/:id", Auth, UserController.get);

export default userRoutes;
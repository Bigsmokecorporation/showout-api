import { Router } from 'express';
import AuthController from "../services/auth/AuthController.js";
const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/apple-login", AuthController.appleLogin);
authRoutes.post("/facebook-login", AuthController.faceBookLogin);
authRoutes.post("/google-login", AuthController.googleLogin);
authRoutes.post("/verify", AuthController.verify);
export default authRoutes;

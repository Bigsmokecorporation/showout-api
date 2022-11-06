import { Router } from 'express';
import UserController from "../services/user/UserController.js";
const authRoutes = Router();

/**
 * @swagger
 * /auth/login:
 *  post:
 *     tags:
 *       - Auth
 *     description: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *      200:
 *          description: Successful login.
 */
authRoutes.post("/login", UserController.create);

export default authRoutes;
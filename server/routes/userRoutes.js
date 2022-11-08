import { Router } from 'express';
import UserController from "../services/user/UserController.js";
import Auth from "../middleware/auth.js";
import authRoutes from "./authRoutes.js";
const userRoutes = Router();

/**
 * @swagger
 * /user/create:
 *  post:
 *     tags:
 *       - User
 *     description: Creates A User Account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               stage_name:
 *                 type: string
 *                 example: Smooth
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *      200:
 *          description: Saves User.
 */
userRoutes.post("/create", UserController.create);

/**
 * @swagger
 * /user/verify:
 *  post:
 *     tags:
 *       - User
 *     description: Verifies a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of user
 *                 example: gfdrsew454678907ytyr
 *               token:
 *                 type: string
 *                 example: 123456
 *     responses:
 *      200:
 *          description: Successful verification.
 */
authRoutes.post("/verify", UserController.create);

/**
 * @swagger
 * /user/update:
 *  put:
 *     tags:
 *       - User
 *     description: Updates A User Account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: 62beeda345678ygfgryt
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *                 example: 233249713683
 *               gender:
 *                 type: string
 *                 enum:
 *                 - M
 *                 - F
 *               tag_name:
 *                 type: string
 *                 example: theKing
 *               city:
 *                 type: string
 *                 example: Accra
 *               country:
 *                 type: string
 *                 example: Ghana
 *               stage_name:
 *                 type: string
 *                 example: Smooth
 *               password:
 *                 type: string
 *                 example: 123456
 *               bio:
 *                 type: string
 *                 example: More stuff here
 *               gcid:
 *                 type: string
 *                 example: 2376ytrtfghjtyre345678978tyrfghfrte5678
 *               strap_line:
 *                 type: string
 *                 example: Cool headed nig
 *               dob:
 *                 type: string
 *                 format: $date
 *                 example: 2000-02-16
 *     responses:
 *      200:
 *          description: Saves User.
 */
userRoutes.post("/update", Auth, UserController.update);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     description: Retrieves A User Account
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *      200:
 *          description: User object.
 *          schema:
 *             type: object
 *             $ref: '#/definitions/UserObj'
 */

/**
 * @swagger
 *  definitions:
 *      UserObj:
 *      required:
 *          - username
 *          - password
 *      properties:
 *          username:
 *              type: string
 *          password:
 *              type: string
 *          path:
 *              type: string
 */
userRoutes.get("/:id", UserController.get);

export default userRoutes;
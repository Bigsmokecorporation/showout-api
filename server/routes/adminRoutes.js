import { Router } from 'express';
import AdminController from "../services/admin/AdminController.js";
const adminRoutes = Router();

adminRoutes.post("/login", AdminController.login);
export default adminRoutes;

import { Router } from 'express';
import AdminController from "../services/admin/AdminController.js";
const adminRoutes = Router();

adminRoutes.post("/create", AdminController.create);
adminRoutes.post("/login", AdminController.login);
adminRoutes.post("/refresh-token", AdminController.refreshToken);
adminRoutes.get("/get-users", AdminController.getUsers);
adminRoutes.get("/get-admins", AdminController.getAdmins);
adminRoutes.put("/update/:id", AdminController.update);
adminRoutes.get("/:id", AdminController.get);
export default adminRoutes;

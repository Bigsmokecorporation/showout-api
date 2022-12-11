import { Router } from 'express';
import AdminController from "../services/admin/AdminController.js";
import {AdminAuth} from "../middleware/auth.js";
const adminRoutes = Router();

adminRoutes.post("/create", AdminAuth, AdminController.create);
adminRoutes.post("/login", AdminController.login);
adminRoutes.post("/refresh-token", AdminController.refreshToken);
adminRoutes.get("/get-users", AdminAuth, AdminController.getUsers);
adminRoutes.get("/get-admins", AdminAuth, AdminController.getAdmins);
adminRoutes.put("/update/:id", AdminAuth, AdminController.update);
adminRoutes.get("/:id", AdminAuth, AdminController.get);
export default adminRoutes;

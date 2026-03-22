import express from "express";
import { authLimiter, authenticate, authorize } from "../middlewares/auth.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.patch("/users/role", authenticate, authorize("admin"), authController.assignRole);

export default router
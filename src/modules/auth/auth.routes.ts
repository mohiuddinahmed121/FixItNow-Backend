import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

router.get("/me", auth(), authController.getMe);

router.patch("/me", auth(), authController.updateMe);

router.patch("/change-password", auth(), authController.changePassword);

export const authRoutes = router;

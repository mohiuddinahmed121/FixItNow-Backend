import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);

router.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);

router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);

router.get("/categories", auth(Role.ADMIN), adminController.getAllCategories);

router.post("/categories", auth(Role.ADMIN), adminController.createCategory);

export const adminRoutes = router;

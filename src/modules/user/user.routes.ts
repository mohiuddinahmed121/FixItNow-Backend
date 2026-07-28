import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/", auth(Role.ADMIN), userController.getAllUsers);

export const userRoutes = router;

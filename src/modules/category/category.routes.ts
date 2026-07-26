import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { categoryController } from "./category.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN), categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

export const categoryRoutes = router;

import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";
import { contactController } from "./contact.controller";

const router = Router();

// Public: anyone can send a message
router.post("/", contactController.createMessage);

// Admin only: read the inbox
router.get("/", auth(Role.ADMIN), contactController.getAllMessages);

export const contactRoutes = router;

import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

router.put("/profile", auth(Role.TECHNICIAN), technicianController.updateProfile);

router.get("/profile", auth(Role.TECHNICIAN), technicianController.getMyProfile);

export const technicianRoutes = router;

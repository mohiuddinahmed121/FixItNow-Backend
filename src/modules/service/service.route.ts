import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/", auth(Role.TECHNICIAN), serviceController.createService);

router.get("/", serviceController.getAllServices);

router.get("/:serviceId", serviceController.getSingleService);

router.put("/:serviceId", auth(Role.TECHNICIAN), serviceController.updateService);

router.delete("/:serviceId", auth(Role.TECHNICIAN), serviceController.deleteService);

export const serviceRoute = router;

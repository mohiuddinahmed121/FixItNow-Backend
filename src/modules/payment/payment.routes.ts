import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import express, { Router } from "express";

const router = Router();

router.post("/create", auth(Role.CUSTOMER), paymentController.createPayment);

router.post("/webhook", express.raw({ type: "application/json" }), paymentController.stripeWebhook);

export const paymentRoutes = router;

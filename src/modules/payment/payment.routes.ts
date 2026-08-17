import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import express, { Router } from "express";

const router = Router();

router.post("/create", auth(Role.CUSTOMER), paymentController.createPayment);

// router.post("/webhook", express.raw({ type: "application/json" }), paymentController.stripeWebhook);

router.get("/", auth(Role.CUSTOMER), paymentController.getMyPayments);

router.get("/:paymentId", auth(Role.CUSTOMER), paymentController.getSinglePayment);

export const paymentRoutes = router;

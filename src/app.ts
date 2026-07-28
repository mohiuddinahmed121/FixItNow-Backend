import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

import { authRoutes } from "./modules/auth/auth.routes";
//import { userRoutes } from "./modules/user/user.routes";
import { technicianRoutes } from "./modules/technician/technician.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { serviceRoute } from "./modules/service/service.route";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import config from "./config";

const app: Application = express();

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(
   cors({
      origin: config.app_url,
      credentials: true,
   }),
);

// Stripe Webhook

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
   res.send("FixItNow API is running...");
});

// // Routes
app.use("/api/auth", authRoutes);
//app.use("/api/users", userRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.get("/payment/success", (req, res) => {
   res.status(200).send(" Payment Successful");
});

app.get("/payment/cancel", (req, res) => {
   res.status(200).send(" Payment Cancelled");
});

app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

// // 404 Handler
app.use(notFound);

// // Global Error Handler
app.use(globalErrorHandler);

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

import { authRoutes } from "./modules/auth/auth.routes";
import { technicianRoutes } from "./modules/technician/technician.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { serviceRoute } from "./modules/service/service.route";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";
import { paymentController } from "./modules/payment/payment.controller";
import { reviewRoutes } from "./modules/review/review.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
// import config from "./config";

const app: Application = express();

// const allowedOrigins = ["http://localhost:3000", "https://fixitnow-frontend-omega.vercel.app"];

// app.use(
//    cors({
//       origin: allowedOrigins,
//       credentials: true,
//    }),
// );

const allowedOrigins = ["http://localhost:3000", "https://fixitnow-frontend-omega.vercel.app"];

app.use(
   cors({
      origin: (origin, callback) => {
         if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
      },
      credentials: true,
   }),
);

app.post(
   "/api/payments/webhook",
   express.raw({ type: "application/json" }),
   paymentController.stripeWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
   res.send("FixItNow API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;

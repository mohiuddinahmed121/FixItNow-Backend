import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);

router.get("/", auth(Role.CUSTOMER), bookingController.getMyBookings);

router.get(
   "/technician/my-bookings",
   auth(Role.TECHNICIAN),
   bookingController.getTechnicianBookings,
);

router.patch(
   "/technician/:bookingId",
   auth(Role.TECHNICIAN),
   bookingController.updateBookingStatus,
);

router.get("/:bookingId", auth(Role.CUSTOMER), bookingController.getSingleBooking);

router.patch("/:bookingId/cancel", auth(Role.CUSTOMER), bookingController.cancelBooking);

export const bookingRoutes = router;

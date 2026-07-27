import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const result = await bookingService.createBooking(customerId, req.body);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Booking created successfully",
      data: result,
   });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const result = await bookingService.getMyBookings(customerId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
   });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const { bookingId } = req.params;

   const result = await bookingService.getSingleBooking(bookingId as string, customerId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking retrieved successfully",
      data: result,
   });
});

const getTechnicianBookings = catchAsync(async (req: Request, res: Response) => {
   const technicianId = req.user!.id;

   const result = await bookingService.getTechnicianBookings(technicianId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician bookings retrieved successfully",
      data: result,
   });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
   const technicianId = req.user!.id;

   const { bookingId } = req.params;

   if (!bookingId) {
      throw new Error("Booking Id is required");
   }

   const result = await bookingService.updateBookingStatus(
      bookingId as string,
      technicianId,
      req.body.status,
   );

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated successfully",
      data: result,
   });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const bookingId = req.params.bookingId;

   if (!bookingId) {
      throw new Error("Booking Id is required");
   }

   const result = await bookingService.cancelBooking(bookingId as string, customerId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking cancelled successfully",
      data: result,
   });
});

export const bookingController = {
   createBooking,
   getMyBookings,
   getSingleBooking,
   getTechnicianBookings,
   updateBookingStatus,
   cancelBooking,
};

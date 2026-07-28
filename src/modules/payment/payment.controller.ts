import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const result = await paymentService.createPayment(customerId, req.body.bookingId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout session created successfully",
      data: result,
   });
});

const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
   const signature = req.headers["stripe-signature"] as string;

   await paymentService.handleWebhook(req.body, signature);

   res.status(200).json({
      received: true,
   });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const result = await paymentService.getMyPayments(customerId);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payments retrieved successfully",
      data: result,
   });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user!.id;

   const { paymentId } = req.params;

   const result = await paymentService.getSinglePayment(customerId, paymentId as string);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment retrieved successfully",
      data: result,
   });
});

export const paymentController = {
   createPayment,
   stripeWebhook,
   getMyPayments,
   getSinglePayment,
};

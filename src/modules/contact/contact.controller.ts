import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { contactService } from "./contact.service";

const createMessage = catchAsync(async (req: Request, res: Response) => {
   await contactService.createMessage(req.body);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Your message has been sent successfully",
      data: null,
   });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
   const result = await contactService.getAllMessages();

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Messages retrieved successfully",
      data: result,
   });
});

export const contactController = {
   createMessage,
   getAllMessages,
};

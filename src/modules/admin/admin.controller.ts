import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const result = await adminService.getAllUsers();

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
   });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const { activeStatus } = req.body;

   const result = await adminService.updateUserStatus(id as string, activeStatus);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
   });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
   const result = await adminService.getAllBookings();

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
   });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
   const result = await adminService.getAllCategories();

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: result,
   });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
   const result = await adminService.createCategory(req.body);

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: result,
   });
});

export const adminController = {
   getAllUsers,
   updateUserStatus,
   getAllBookings,
   getAllCategories,
   createCategory,
};

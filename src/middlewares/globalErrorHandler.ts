import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   console.log("Error:", err);

   let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
   let errorMessage = err.message || "Internal Server Error";
   let errorDetails: any = null;

   if (err instanceof Prisma.PrismaClientValidationError) {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "You have provided incorrect field type or missing fields";
   } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = httpStatus.BAD_REQUEST;

      if (err.code === "P2002") {
         errorMessage = "Duplicate Key Error";
      } else if (err.code === "P2003") {
         errorMessage = "Foreign key constraint failed";
      } else if (err.code === "P2025") {
         errorMessage =
            "An operation failed because it depends on one or more records that were required but not found.";
      }

      errorDetails = err.meta;
   } else if (err instanceof Prisma.PrismaClientInitializationError) {
      if (err.errorCode === "P1000") {
         statusCode = httpStatus.UNAUTHORIZED;
         errorMessage =
            "Authentication failed against database server. Please check your credentials.";
      } else if (err.errorCode === "P1001") {
         statusCode = httpStatus.BAD_REQUEST;
         errorMessage = "Can't reach database server.";
      }
   } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = "Error occurred during query execution";
   } else if (err instanceof Error) {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = err.message;
   }

   res.status(statusCode).json({
      success: false,
      statusCode,
      message: errorMessage,
      errorDetails,
   });
};

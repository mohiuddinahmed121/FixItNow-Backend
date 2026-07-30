import { Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyBookings: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleBooking: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getTechnicianBookings: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cancelBooking: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map
import { Request, Response } from "express";
export declare const paymentController: {
    createPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    stripeWebhook: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyPayments: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSinglePayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map
import { BookingStatus, PaymentMethod, PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";
declare const createPayment: (customerId: string, bookingId: string) => Promise<{
    checkoutUrl: string | null;
    payment: {
        id: string;
        amount: number;
        transactionId: string;
        paymentIntentId: string;
        method: PaymentMethod;
        provider: PaymentProvider;
        status: PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
    };
}>;
declare const handleWebhook: (payload: Buffer, signature: string) => Promise<void>;
declare const getMyPayments: (customerId: string) => Promise<({
    booking: {
        service: {
            id: string;
            title: string;
            description: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
            technicianProfileId: string;
            categoryId: string;
        };
    } & {
        id: string;
        bookingDate: Date;
        note: string | null;
        status: BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        serviceId: string;
    };
} & {
    id: string;
    amount: number;
    transactionId: string;
    paymentIntentId: string;
    method: PaymentMethod;
    provider: PaymentProvider;
    status: PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    bookingId: string;
})[]>;
declare const getSinglePayment: (customerId: string, paymentId: string) => Promise<{
    booking: {
        service: {
            id: string;
            title: string;
            description: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
            technicianProfileId: string;
            categoryId: string;
        };
    } & {
        id: string;
        bookingDate: Date;
        note: string | null;
        status: BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        serviceId: string;
    };
} & {
    id: string;
    amount: number;
    transactionId: string;
    paymentIntentId: string;
    method: PaymentMethod;
    provider: PaymentProvider;
    status: PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    bookingId: string;
}>;
export declare const paymentService: {
    createPayment: typeof createPayment;
    handleWebhook: typeof handleWebhook;
    getMyPayments: typeof getMyPayments;
    getSinglePayment: typeof getSinglePayment;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map
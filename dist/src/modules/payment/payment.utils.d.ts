import Stripe from "stripe";
export declare const createCheckoutSession: (amount: number, bookingId: string) => Promise<Stripe.Checkout.Session>;
export declare const handleCheckoutCompleted: (session: Stripe.Checkout.Session) => Promise<void>;
export declare const paymentUtils: {
    createCheckoutSession: typeof createCheckoutSession;
    handleCheckoutCompleted: typeof handleCheckoutCompleted;
};
//# sourceMappingURL=payment.utils.d.ts.map
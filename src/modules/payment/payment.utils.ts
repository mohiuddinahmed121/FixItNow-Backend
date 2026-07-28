import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import { PaymentStatus, BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const createCheckoutSession = async (
   amount: number,
   bookingId: string,
): Promise<Stripe.Checkout.Session> => {
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
         {
            price_data: {
               currency: "usd",
               product_data: {
                  name: `Booking ${bookingId}`,
               },
               unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
         },
      ],

      success_url: `${config.app_url}/payment/success`,
      cancel_url: `${config.app_url}/payment/cancel`,

      metadata: {
         bookingId,
      },
   });

   return session;
};

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
   const bookingId = session.metadata?.bookingId;

   if (!bookingId) {
      console.log("Missing bookingId in metadata");
      return;
   }

   await prisma.$transaction(async (tx) => {
      await tx.payment.update({
         where: {
            bookingId,
         },
         data: {
            status: PaymentStatus.COMPLETED,
            paidAt: new Date(),
            transactionId: session.payment_intent as string,
         },
      });

      await tx.booking.update({
         where: {
            id: bookingId,
         },
         data: {
            status: BookingStatus.PAID,
         },
      });
   });
};

export const paymentUtils = {
   createCheckoutSession,
   handleCheckoutCompleted,
};

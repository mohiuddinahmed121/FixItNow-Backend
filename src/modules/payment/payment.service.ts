import crypto from "crypto";
import {
   BookingStatus,
   PaymentMethod,
   PaymentProvider,
   PaymentStatus,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { createCheckoutSession, handleCheckoutCompleted } from "./payment.utils";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import { Stripe } from "stripe";

const createPayment = async (customerId: string, bookingId: string) => {
   // Booking exists?
   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
      },
      include: {
         service: true,
      },
   });

   // Booking owner check
   if (booking.customerId !== customerId) {
      throw new Error("You are not authorized");
   }

   // Technician must accept first
   if (booking.status !== BookingStatus.ACCEPTED) {
      throw new Error("Booking is not accepted yet");
   }

   // Already paid?
   const existingPayment = await prisma.payment.findUnique({
      where: {
         bookingId,
      },
   });

   if (existingPayment) {
      throw new Error("Payment already exists for this booking");
   }

   // Stripe Checkout Session
   const session = await createCheckoutSession(booking.service.price, booking.id);

   // Save payment
   const payment = await prisma.payment.create({
      data: {
         bookingId: booking.id,
         amount: booking.service.price,

         transactionId: crypto.randomUUID(),
         //transactionId: session.payment_intent as string,
         paymentIntentId: session.id,

         method: PaymentMethod.ONLINE,

         provider: PaymentProvider.STRIPE,

         status: PaymentStatus.PENDING,
      },
   });

   return {
      checkoutUrl: session.url,
      payment,
   };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
   const endpointSecret = config.stripe_webhook_secret;

   const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

   switch (event.type) {
      case "checkout.session.completed":
         await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
         break;

      default:
         console.log(`Unhandled event type: ${event.type}`);
   }
};

export const paymentService = {
   createPayment,
   handleWebhook,
};

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
   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
      },
      include: {
         service: true,
      },
   });

   if (booking.customerId !== customerId) {
      throw new Error("You are not authorized");
   }

   if (booking.status !== BookingStatus.ACCEPTED) {
      throw new Error("Booking is not accepted yet");
   }

   const existingPayment = await prisma.payment.findUnique({
      where: {
         bookingId,
      },
   });

   if (existingPayment) {
      throw new Error("Payment already exists for this booking");
   }

   const session = await createCheckoutSession(booking.service.price, booking.id);

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

const getMyPayments = async (customerId: string) => {
   const payments = await prisma.payment.findMany({
      where: {
         booking: {
            customerId,
         },
      },
      include: {
         booking: {
            include: {
               service: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   return payments;
};

const getSinglePayment = async (customerId: string, paymentId: string) => {
   const payment = await prisma.payment.findUniqueOrThrow({
      where: {
         id: paymentId,
      },
      include: {
         booking: {
            include: {
               service: true,
            },
         },
      },
   });

   if (payment.booking.customerId !== customerId) {
      throw new Error("You are not authorized");
   }

   return payment;
};

export const paymentService = {
   createPayment,
   handleWebhook,
   getMyPayments,
   getSinglePayment,
};

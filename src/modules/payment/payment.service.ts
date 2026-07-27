// import crypto from "crypto";
// import {
//    BookingStatus,
//    PaymentMethod,
//    PaymentProvider,
//    PaymentStatus,
// } from "../../../generated/prisma/enums";
// import { prisma } from "../../lib/prisma";
// import { createCheckoutSession } from "./payment.utils";

// const createPayment = async (customerId: string, bookingId: string) => {
//    // Booking exists?
//    const booking = await prisma.booking.findUniqueOrThrow({
//       where: {
//          id: bookingId,
//       },
//       include: {
//          service: true,
//       },
//    });

//    // Booking owner check
//    if (booking.customerId !== customerId) {
//       throw new Error("You are not authorized");
//    }

//    // Technician must accept first
//    if (booking.status !== BookingStatus.ACCEPTED) {
//       throw new Error("Booking is not accepted yet");
//    }

//    // Already paid?
//    const existingPayment = await prisma.payment.findUnique({
//       where: {
//          bookingId,
//       },
//    });

//    if (existingPayment) {
//       throw new Error("Payment already exists for this booking");
//    }

//    // Stripe Checkout Session
//    const session = await createCheckoutSession(booking.service.price, booking.id);

//    // Save payment
//    const payment = await prisma.payment.create({
//       data: {
//          bookingId: booking.id,
//          amount: booking.service.price,

//          transactionId: crypto.randomUUID(),

//          paymentIntentId: session.id,

//          method: PaymentMethod.ONLINE,

//          provider: PaymentProvider.STRIPE,

//          status: PaymentStatus.PENDING,
//       },
//    });

//    return {
//       checkoutUrl: session.url,
//       payment,
//    };
// };

// export const paymentService = {
//    createPayment,
// };

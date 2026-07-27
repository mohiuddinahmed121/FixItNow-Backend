import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReview = async (customerId: string, payload: ICreateReview) => {
   const { bookingId, rating, comment } = payload;

   // Booking exists?
   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
      },
      include: {
         service: {
            include: {
               technicianProfile: true,
            },
         },
      },
   });

   // Only booking owner can review
   if (booking.customerId !== customerId) {
      throw new Error("You are not authorized to review this booking");
   }

   // Booking must be completed
   if (booking.status !== BookingStatus.COMPLETED) {
      throw new Error("You can only review after the service is completed");
   }

   // Prevent duplicate review
   const existingReview = await prisma.review.findUnique({
      where: {
         bookingId,
      },
   });

   if (existingReview) {
      throw new Error("You have already reviewed this booking");
   }

   const review = await prisma.review.create({
      data: {
         rating,
         comment,
         customerId,
         bookingId,
         technicianProfileId: booking.service.technicianProfile.id,
      },

      include: {
         customer: {
            omit: {
               password: true,
            },
         },

         technicianProfile: {
            include: {
               user: {
                  omit: {
                     password: true,
                  },
               },
            },
         },
      },
   });

   return review;
};

export const reviewService = {
   createReview,
};

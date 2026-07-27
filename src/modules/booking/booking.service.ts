import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createBooking = async (customerId: string, payload: any) => {
   const { serviceId, bookingDate, note } = payload;

   // Service exists?
   const service = await prisma.service.findUniqueOrThrow({
      where: {
         id: serviceId,
      },
      include: {
         technicianProfile: true,
      },
   });

   // Technician available?
   if (!service.technicianProfile.isAvailable) {
      throw new Error("Technician is not available");
   }

   const booking = await prisma.booking.create({
      data: {
         bookingDate: new Date(bookingDate),
         note,
         status: BookingStatus.REQUESTED,
         customerId,
         serviceId,
      },
      include: {
         customer: {
            omit: {
               password: true,
            },
         },
         service: {
            include: {
               category: true,
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
         },
      },
   });

   return booking;
};

export const bookingService = {
   createBooking,
};

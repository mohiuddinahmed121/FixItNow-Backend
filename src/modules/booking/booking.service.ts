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

const getMyBookings = async (customerId: string) => {
   return await prisma.booking.findMany({
      where: {
         customerId,
      },
      orderBy: {
         createdAt: "desc",
      },
      include: {
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
};

const getSingleBooking = async (bookingId: string, customerId: string) => {
   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
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
         payment: true,
         review: true,
      },
   });

   if (booking.customerId !== customerId) {
      throw new Error("You are not authorized to view this booking");
   }

   return booking;
};

export const bookingService = {
   createBooking,
   getMyBookings,
   getSingleBooking,
};

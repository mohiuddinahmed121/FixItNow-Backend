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

const getTechnicianBookings = async (technicianId: string) => {
   const technicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
      where: {
         userId: technicianId,
      },
   });

   return await prisma.booking.findMany({
      where: {
         service: {
            technicianProfileId: technicianProfile.id,
         },
      },
      orderBy: {
         createdAt: "desc",
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
            },
         },
      },
   });
};

const updateBookingStatus = async (
   bookingId: string,
   technicianId: string,
   status: BookingStatus,
) => {
   const technicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
      where: {
         userId: technicianId,
      },
   });

   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
      },
      include: {
         service: true,
      },
   });

   if (booking.service.technicianProfileId !== technicianProfile.id) {
      throw new Error("You are not authorized to update this booking");
   }

   // Status validation

   if (
      booking.status === BookingStatus.REQUESTED &&
      status !== BookingStatus.ACCEPTED &&
      status !== BookingStatus.DECLINED
   ) {
      throw new Error("Invalid booking status transition");
   }

   if (booking.status === BookingStatus.ACCEPTED && status !== BookingStatus.IN_PROGRESS) {
      throw new Error("Invalid booking status transition");
   }

   if (booking.status === BookingStatus.IN_PROGRESS && status !== BookingStatus.COMPLETED) {
      throw new Error("Invalid booking status transition");
   }

   if (booking.status === BookingStatus.DECLINED || booking.status === BookingStatus.COMPLETED) {
      throw new Error("Booking can no longer be updated");
   }

   return await prisma.booking.update({
      where: {
         id: bookingId,
      },
      data: {
         status,
      },
      include: {
         customer: {
            omit: {
               password: true,
            },
         },
         service: true,
      },
   });
};

const cancelBooking = async (bookingId: string, customerId: string) => {
   const booking = await prisma.booking.findUniqueOrThrow({
      where: {
         id: bookingId,
      },
   });

   if (booking.customerId !== customerId) {
      throw new Error("You are not authorized");
   }

   if (booking.status === BookingStatus.IN_PROGRESS || booking.status === BookingStatus.COMPLETED) {
      throw new Error("Booking cannot be cancelled after work has started");
   }

   if (booking.status === BookingStatus.DECLINED) {
      throw new Error("Booking is already declined");
   }

   return await prisma.booking.update({
      where: {
         id: bookingId,
      },
      data: {
         status: BookingStatus.CANCELED,
      },
      include: {
         customer: {
            omit: {
               password: true,
            },
         },
         service: true,
      },
   });
};

export const bookingService = {
   createBooking,
   getMyBookings,
   getSingleBooking,
   getTechnicianBookings,
   updateBookingStatus,
   cancelBooking,
};

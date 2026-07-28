import { prisma } from "../../lib/prisma";
import { ICreateService, IUpdateService } from "./service.interface";

const createService = async (userId: string, payload: ICreateService) => {
   // Check technician profile
   const technician = await prisma.technicianProfile.findUnique({
      where: {
         userId,
      },
   });

   if (!technician) {
      throw new Error("Technician profile not found");
   }

   // Check category
   const category = await prisma.category.findUnique({
      where: {
         id: payload.categoryId,
      },
   });

   if (!category) {
      throw new Error("Category not found");
   }

   // Create service
   const service = await prisma.service.create({
      data: {
         title: payload.title,
         description: payload.description,
         price: payload.price,
         categoryId: payload.categoryId,
         technicianProfileId: technician.id,
      },

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
   });

   return service;
};

const getAllServices = async () => {
   return await prisma.service.findMany({
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
      orderBy: {
         createdAt: "desc",
      },
   });
};

const getSingleService = async (serviceId: string) => {
   const service = await prisma.service.findUniqueOrThrow({
      where: {
         id: serviceId,
      },
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
   });

   return service;
};

const updateService = async (serviceId: string, userId: string, payload: any) => {
   const technician = await prisma.technicianProfile.findUniqueOrThrow({
      where: {
         userId,
      },
   });

   const service = await prisma.service.findUniqueOrThrow({
      where: {
         id: serviceId,
      },
   });

   if (service.technicianProfileId !== technician.id) {
      throw new Error("You are not authorized to update this service");
   }

   const updatedService = await prisma.service.update({
      where: {
         id: serviceId,
      },
      data: payload,
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
   });

   return updatedService;
};

const deleteService = async (serviceId: string, userId: string) => {
   const technician = await prisma.technicianProfile.findUniqueOrThrow({
      where: {
         userId,
      },
   });

   const service = await prisma.service.findUniqueOrThrow({
      where: {
         id: serviceId,
      },
   });

   if (service.technicianProfileId !== technician.id) {
      throw new Error("You are not authorized to delete this service");
   }

   throw new Error("Cannot delete a service that has bookings.");

   await prisma.service.delete({
      where: {
         id: serviceId,
      },
   });

   return null;
};
export const serviceService = {
   createService,
   getAllServices,
   getSingleService,
   updateService,
   deleteService,
};

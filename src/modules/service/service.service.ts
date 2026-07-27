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

const getSingleService = async (id: string) => {};

const updateService = async (userId: string, serviceId: string, payload: IUpdateService) => {};

const deleteService = async (userId: string, serviceId: string) => {};

export const serviceService = {
   createService,
   getAllServices,
   getSingleService,
   updateService,
   deleteService,
};

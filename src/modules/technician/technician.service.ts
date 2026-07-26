import { prisma } from "../../lib/prisma";
import { IUpdateTechnicianProfile } from "./technician.interface";

const updateProfile = async (userId: string, payload: IUpdateTechnicianProfile) => {
   const technician = await prisma.technicianProfile.findUnique({
      where: {
         userId,
      },
   });

   if (!technician) {
      return await prisma.technicianProfile.create({
         data: {
            ...payload,
            userId,
         },
      });
   }

   return await prisma.technicianProfile.update({
      where: {
         userId,
      },
      data: payload,
   });
};

const getMyProfile = async (userId: string) => {
   return await prisma.technicianProfile.findUniqueOrThrow({
      where: {
         userId,
      },
      include: {
         user: {
            omit: {
               password: true,
            },
         },
         services: true,
      },
   });
};

export const technicianService = {
   updateProfile,
   getMyProfile,
};

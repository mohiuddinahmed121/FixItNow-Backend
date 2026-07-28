import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
   return await prisma.user.findMany({
      omit: {
         password: true,
      },
      include: {
         technicianProfile: true,
      },
      orderBy: {
         createdAt: "desc",
      },
   });
};

export const userService = {
   getAllUsers,
};

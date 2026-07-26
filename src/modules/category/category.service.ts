import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interface";

const createCategory = async (payload: ICreateCategory) => {
   const isExist = await prisma.category.findUnique({
      where: {
         name: payload.name,
      },
   });

   if (isExist) {
      throw new Error("Category already exists");
   }

   return await prisma.category.create({
      data: payload,
   });
};

const getAllCategories = async () => {
   return await prisma.category.findMany({
      orderBy: {
         createdAt: "desc",
      },
   });
};

export const categoryService = {
   createCategory,
   getAllCategories,
};

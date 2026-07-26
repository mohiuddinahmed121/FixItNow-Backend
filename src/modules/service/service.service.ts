import { prisma } from "../../lib/prisma";
import { ICreateService, IUpdateService } from "./service.interface";

const createService = async (userId: string, payload: ICreateService) => {};

const getAllServices = async () => {};

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

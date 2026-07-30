import { prisma } from "../../lib/prisma";
import { categoryService } from "../category/category.service";
const getAllUsers = async () => {
    const result = await prisma.user.findMany({
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
    return result;
};
const updateUserStatus = async (userId, activeStatus) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    const result = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            activeStatus,
        },
        omit: {
            password: true,
        },
    });
    return result;
};
const getAllBookings = async () => {
    const result = await prisma.booking.findMany({
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
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getAllCategories = async () => {
    return await categoryService.getAllCategories();
};
const createCategory = async (payload) => {
    return await categoryService.createCategory(payload);
};
export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllBookings,
    getAllCategories,
    createCategory,
};
//# sourceMappingURL=admin.service.js.map
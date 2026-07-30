import { prisma } from "../../lib/prisma";
const updateProfile = async (userId, payload) => {
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!technician) {
        if (payload.experience === undefined ||
            payload.skills === undefined ||
            payload.location === undefined ||
            payload.hourlyRate === undefined) {
            throw new Error("experience, skills, location and hourlyRate are required");
        }
        return await prisma.technicianProfile.create({
            data: {
                userId,
                bio: payload.bio,
                experience: payload.experience,
                skills: payload.skills,
                location: payload.location,
                hourlyRate: payload.hourlyRate,
                isAvailable: payload.isAvailable ?? true,
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
const getMyProfile = async (userId) => {
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
//# sourceMappingURL=technician.service.js.map
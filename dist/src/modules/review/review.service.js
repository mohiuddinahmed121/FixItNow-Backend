import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const createReview = async (customerId, payload) => {
    const { bookingId, rating, comment } = payload;
    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
        },
        include: {
            service: {
                include: {
                    technicianProfile: true,
                },
            },
        },
    });
    if (booking.customerId !== customerId) {
        throw new Error("You are not authorized to review this booking");
    }
    if (booking.status !== BookingStatus.COMPLETED) {
        throw new Error("You can only review after the service is completed");
    }
    const existingReview = await prisma.review.findUnique({
        where: {
            bookingId,
        },
    });
    if (existingReview) {
        throw new Error("You have already reviewed this booking");
    }
    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            customerId,
            bookingId,
            technicianProfileId: booking.service.technicianProfile.id,
        },
        include: {
            customer: {
                omit: {
                    password: true,
                },
            },
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
    return review;
};
const getTechnicianReviews = async (technicianProfileId) => {
    const reviews = await prisma.review.findMany({
        where: {
            technicianProfileId,
        },
        include: {
            customer: {
                omit: {
                    password: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const aggregate = await prisma.review.aggregate({
        where: {
            technicianProfileId,
        },
        _avg: {
            rating: true,
        },
        _count: {
            rating: true,
        },
    });
    return {
        averageRating: aggregate._avg.rating ?? 0,
        totalReviews: aggregate._count.rating,
        reviews,
    };
};
export const reviewService = {
    createReview,
    getTechnicianReviews,
};
//# sourceMappingURL=review.service.js.map
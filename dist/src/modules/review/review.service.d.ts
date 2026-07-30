import { ICreateReview } from "./review.interface";
declare const createReview: (customerId: string, payload: ICreateReview) => Promise<{
    customer: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    technicianProfile: {
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../../generated/prisma/enums").Role;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        bio: string | null;
        experience: number;
        skills: string[];
        location: string;
        hourlyRate: number;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    bookingId: string;
    technicianProfileId: string;
}>;
declare const getTechnicianReviews: (technicianProfileId: string) => Promise<{
    averageRating: number;
    totalReviews: number;
    reviews: ({
        customer: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../../generated/prisma/enums").Role;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        bookingId: string;
        technicianProfileId: string;
    })[];
}>;
export declare const reviewService: {
    createReview: typeof createReview;
    getTechnicianReviews: typeof getTechnicianReviews;
};
export {};
//# sourceMappingURL=review.service.d.ts.map
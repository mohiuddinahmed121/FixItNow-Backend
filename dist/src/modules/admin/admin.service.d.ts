import { ActiveStatus } from "../../../generated/prisma/enums";
declare const getAllUsers: () => Promise<({
    technicianProfile: {
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
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    activeStatus: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const updateUserStatus: (userId: string, activeStatus: ActiveStatus) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    activeStatus: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllBookings: () => Promise<({
    customer: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    payment: {
        id: string;
        amount: number;
        transactionId: string;
        paymentIntentId: string;
        method: import("../../../generated/prisma/enums").PaymentMethod;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
    } | null;
    review: {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        bookingId: string;
        technicianProfileId: string;
    } | null;
    service: {
        category: {
            id: string;
            name: string;
            description: string | null;
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
                activeStatus: ActiveStatus;
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
        title: string;
        description: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        technicianProfileId: string;
        categoryId: string;
    };
} & {
    id: string;
    bookingDate: Date;
    note: string | null;
    status: import("../../../generated/prisma/enums").BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
})[]>;
declare const getAllCategories: () => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const createCategory: (payload: {
    name: string;
    description?: string;
}) => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const adminService: {
    getAllUsers: typeof getAllUsers;
    updateUserStatus: typeof updateUserStatus;
    getAllBookings: typeof getAllBookings;
    getAllCategories: typeof getAllCategories;
    createCategory: typeof createCategory;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map
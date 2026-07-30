import { BookingStatus } from "../../../generated/prisma/enums";
declare const createBooking: (customerId: string, payload: any) => Promise<{
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
}>;
declare const getMyBookings: (customerId: string) => Promise<({
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
})[]>;
declare const getSingleBooking: (bookingId: string, customerId: string) => Promise<{
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
}>;
declare const getTechnicianBookings: (technicianId: string) => Promise<({
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
    service: {
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
})[]>;
declare const updateBookingStatus: (bookingId: string, technicianId: string, status: BookingStatus) => Promise<{
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
    service: {
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
}>;
declare const cancelBooking: (bookingId: string, customerId: string) => Promise<{
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
    service: {
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
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    serviceId: string;
}>;
export declare const bookingService: {
    createBooking: typeof createBooking;
    getMyBookings: typeof getMyBookings;
    getSingleBooking: typeof getSingleBooking;
    getTechnicianBookings: typeof getTechnicianBookings;
    updateBookingStatus: typeof updateBookingStatus;
    cancelBooking: typeof cancelBooking;
};
export {};
//# sourceMappingURL=booking.service.d.ts.map
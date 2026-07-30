import { ICreateService } from "./service.interface";
declare const createService: (userId: string, payload: ICreateService) => Promise<{
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
}>;
declare const getAllServices: () => Promise<({
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
})[]>;
declare const getSingleService: (serviceId: string) => Promise<{
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
}>;
declare const updateService: (serviceId: string, userId: string, payload: any) => Promise<{
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
}>;
declare const deleteService: (serviceId: string, userId: string) => Promise<null>;
export declare const serviceService: {
    createService: typeof createService;
    getAllServices: typeof getAllServices;
    getSingleService: typeof getSingleService;
    updateService: typeof updateService;
    deleteService: typeof deleteService;
};
export {};
//# sourceMappingURL=service.service.d.ts.map
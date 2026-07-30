import { IUpdateTechnicianProfile } from "./technician.interface";
declare const updateProfile: (userId: string, payload: IUpdateTechnicianProfile) => Promise<{
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
}>;
declare const getMyProfile: (userId: string) => Promise<{
    services: {
        id: string;
        title: string;
        description: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        technicianProfileId: string;
        categoryId: string;
    }[];
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
}>;
export declare const technicianService: {
    updateProfile: typeof updateProfile;
    getMyProfile: typeof getMyProfile;
};
export {};
//# sourceMappingURL=technician.service.d.ts.map
import { ActiveStatus } from "../../../generated/prisma/enums";
import { ILoginUser, IRegisterUser } from "./auth.interface";
declare const registerUser: (payload: IRegisterUser) => Promise<{
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
    accessToken: string;
    refreshToken: string;
}>;
declare const loginUser: (payload: ILoginUser) => Promise<{
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
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (token: string) => Promise<{
    accessToken: string;
}>;
declare const getMe: (userId: string) => Promise<{
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
}>;
export declare const authService: {
    registerUser: typeof registerUser;
    loginUser: typeof loginUser;
    refreshToken: typeof refreshToken;
    getMe: typeof getMe;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map
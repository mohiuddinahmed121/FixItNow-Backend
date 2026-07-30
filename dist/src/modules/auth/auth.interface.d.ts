export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    role: "CUSTOMER" | "TECHNICIAN";
}
export interface ILoginUser {
    email: string;
    password: string;
}
//# sourceMappingURL=auth.interface.d.ts.map
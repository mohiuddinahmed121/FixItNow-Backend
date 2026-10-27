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

export interface IUpdateMe {
   name?: string;
   phone?: string | null;
}

export interface IChangePassword {
   currentPassword: string;
   newPassword: string;
}

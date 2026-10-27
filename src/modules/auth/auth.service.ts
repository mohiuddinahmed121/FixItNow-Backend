import bcrypt from "bcryptjs";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { IChangePassword, ILoginUser, IRegisterUser, IUpdateMe } from "./auth.interface";
import config from "../../config";

const registerUser = async (payload: IRegisterUser) => {
   const isUserExist = await prisma.user.findUnique({
      where: {
         email: payload.email,
      },
   });

   if (isUserExist) {
      throw new Error("User already exists");
   }

   const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));

   const user = await prisma.user.create({
      data: {
         name: payload.name,
         email: payload.email,
         password: hashedPassword,
         role: payload.role,
      },
   });

   const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
   };

   const accessToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in as SignOptions,
   );

   const refreshToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in as SignOptions,
   );

   const { password, ...userWithoutPassword } = user;

   return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
   };
};

const loginUser = async (payload: ILoginUser) => {
   const { email, password } = payload;

   const user = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (!user) {
      throw new Error("User not found");
   }

   if (user.activeStatus === ActiveStatus.BLOCKED) {
      throw new Error("Your account has been blocked. Please contact support.");
   }

   const isPasswordMatched = await bcrypt.compare(password, user.password);

   if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
   }

   const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
   };

   const accessToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in as SignOptions,
   );

   const refreshToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in as SignOptions,
   );

   const { password: _, ...userWithoutPassword } = user;

   return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
   };
};

const refreshToken = async (token: string) => {
   const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);

   if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
   }

   const { id } = verifiedToken.data as JwtPayload;

   const user = await prisma.user.findUniqueOrThrow({
      where: {
         id,
      },
   });

   if (user.activeStatus === ActiveStatus.BLOCKED) {
      throw new Error("User is blocked");
   }

   const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
   };

   const accessToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in as SignOptions,
   );

   return {
      accessToken,
   };
};

const getMe = async (userId: string) => {
   return await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
      },
      omit: {
         password: true,
      },
      include: {
         technicianProfile: true,
      },
   });
};

const PHONE_PATTERN = /^\+?[0-9\s-]{7,20}$/;

const updateMe = async (userId: string, payload: IUpdateMe) => {
   const data: { name?: string; phone?: string | null } = {};

   if (payload.name !== undefined) {
      const name = String(payload.name).trim();

      if (name.length < 2 || name.length > 100) {
         throw new Error("Name must be between 2 and 100 characters");
      }

      data.name = name;
   }

   if (payload.phone !== undefined) {
      const phone = payload.phone === null ? "" : String(payload.phone).trim();

      if (phone === "") {
         data.phone = null;
      } else {
         if (!PHONE_PATTERN.test(phone)) {
            throw new Error("Phone number must be 7-20 digits and may start with +");
         }

         data.phone = phone;
      }
   }

   if (Object.keys(data).length === 0) {
      throw new Error("Nothing to update");
   }

   return await prisma.user.update({
      where: {
         id: userId,
      },
      data,
      omit: {
         password: true,
      },
      include: {
         technicianProfile: true,
      },
   });
};

const changePassword = async (userId: string, payload: IChangePassword) => {
   const { currentPassword, newPassword } = payload;

   if (!currentPassword || !newPassword) {
      throw new Error("Current password and new password are required");
   }

   if (typeof newPassword !== "string" || newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters");
   }

   if (currentPassword === newPassword) {
      throw new Error("New password must be different from the current password");
   }

   const user = await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
      },
   });

   const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);

   if (!isPasswordMatched) {
      throw new Error("Current password is incorrect");
   }

   const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

   await prisma.user.update({
      where: {
         id: userId,
      },
      data: {
         password: hashedPassword,
      },
   });

   return null;
};

export const authService = {
   registerUser,
   loginUser,
   refreshToken,
   getMe,
   updateMe,
   changePassword,
};

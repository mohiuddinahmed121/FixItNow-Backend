import bcrypt from "bcryptjs";
import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
const registerUser = async (payload) => {
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
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    const { password, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
};
const loginUser = async (payload) => {
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
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    const { password: _, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);
    if (!verifiedToken.success) {
        throw new Error(verifiedToken.error);
    }
    const { id } = verifiedToken.data;
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
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    return {
        accessToken,
    };
};
const getMe = async (userId) => {
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
export const authService = {
    registerUser,
    loginUser,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.service.js.map
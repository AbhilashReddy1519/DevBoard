import { Types } from "mongoose";
import { generateToken } from "../config/jwt";
import User, { IUser } from "../models/User";
import { encryptPassword, verifyPassword } from "../utils/bycrypt";

export const authService = {
    async signUp(payload: {
        name: any
        email: string;
        username: string;
        password: string;
    }) {
        const existingUser = await User.findOne({
			$or: [{ email: payload.email }, { username: payload.username }],
		});

		if (existingUser) {
			if (existingUser.email === payload.email) {
				throw new Error("User with this email already exists");
			}
			if (existingUser.username === payload.username) {
				throw new Error("User with this username already exists");
			}
		}

        const hashedPassword = await encryptPassword(payload.password);
        const user = await User.create({...payload, password: hashedPassword});
        return { userId: (user._id as Types.ObjectId).toString() };
    },

    async Login(userIdentifier: string, password: string) {
        const user = await User.findOne({
            $or : [
                {email: userIdentifier},
                {username: userIdentifier}
            ],
        });

        if(!user) throw new Error("Invalid credentials, user with email/username does not exist");
        const ok = await verifyPassword(password, user.password);
        if(!ok) throw new Error("Invalid Credentials, Check Password Once again");

        const token = generateToken({userId: (user._id as Types.ObjectId).toString(), role: user.role})
        return { token, userId: (user._id as Types.ObjectId).toString() };
    }
}

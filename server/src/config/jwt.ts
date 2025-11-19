import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "./index";

export type JWTPayloadShape = {
	userId: string;
	role?: string;
	iat?: number;
	exp?: number;
}

export function generateToken(payload: Partial<JWTPayloadShape>): string {
	const token = jwt.sign(payload as object, JWT_SECRET_KEY as string, { expiresIn: "8h" });
	return token;
}

export function verifyToken(token: string, JWT_SECRET_KEY: string): JWTPayloadShape {
	try {
		const payload = jwt.verify(token, JWT_SECRET_KEY) as JWTPayloadShape | string;
		if(typeof payload === "string") {
			throw new Error("Invalid token payload format"); 
		}
		return payload;
	} catch (err: any) {
		console.error(err);
		throw new Error(err?.message ?? "Token verification failed");
	}
}

// export = { generateToken, verifyToken };

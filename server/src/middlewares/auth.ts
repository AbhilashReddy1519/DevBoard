import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../config";
import { fail } from "../utils/response";
import { verifyToken } from "../config/jwt";

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const header = req.headers.authorization;
	if (!header?.startsWith("Bearer ")) return fail(res, "Unauthorized", 401);
	const token = header.split(" ")[1];
	try {
		const payload = verifyToken(token, JWT_SECRET_KEY);
		req.payload = { userId: payload.userId, role: payload.role };
		next();
	} catch (err) {
		return fail(res, "Invalid or expired token", 401);
	}
};

import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { fail, success } from "../utils/response";

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const payload = req.body;
		const result = await authService.signUp(payload);
		return success(res, result, 201);
	} catch(err: any) {
		return fail(res, err.message ?? "SignUp failed", 400);
	}
};

export const login = async (req: Request, res:Response, next: NextFunction) : Promise<Response> => {
	try {
		const {userIdentifier, password} = req.body;
		const result = await authService.Login(userIdentifier,password);
		return success(res,result,200);
	} catch(err: any) {
		return fail(res, err.message ?? "Login failed",400);
	}
}
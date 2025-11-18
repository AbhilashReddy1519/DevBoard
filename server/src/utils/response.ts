import { Response } from "express";

export const success = (res: Response, data: any, code = 200) =>
	res.status(code).json({ success: true, data });

export const fail = (res: Response, message: string, code = 400) =>
	res.status(code).json({ success: false, error: message });

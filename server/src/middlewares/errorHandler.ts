import { NextFunction, Request, Response } from "express";
import { log } from "../utils/logger";
import { fail } from "../utils/response";

export function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	log.error(err?.stack ?? err);
	const message = err?.message ?? "Internal server error";
	fail(res, message, err?.status || 500);
}

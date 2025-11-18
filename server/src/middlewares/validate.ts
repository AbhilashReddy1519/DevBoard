import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { fail } from "../utils/response";

export const validate =
	(schema: ZodSchema<any>) =>
	(req: Request, res: Response, next: NextFunction) => {
		const parseResult = schema.safeParse({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		if (!parseResult.success) {
			const errors = parseResult.error.flatten();
			return fail(res, JSON.stringify(errors), 400);
		}
		// optionally attach typed data: req.body = parseResult.data.body
		next();
	};

import { z } from "zod";

export const userLoginSchema = z.object({
	userIdentifier: z
		.string()
		.trim()
		.min(1, "Please enter your username or email address."),

	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters"),
});

export type TUserLoginSchema = z.Infer<typeof userLoginSchema>;

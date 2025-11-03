import { z } from "zod";

const userSignUpSchema = z.object({
	name: z.object({
		firstName: z
			.string({ message: "First name is required" })
			.trim()
			.min(1, "First name cannot be empty"),
		lastName: z
			.string({ message: "Last name is required" })
			.trim()
			.min(1, "Last name cannot be empty"),
		middleName: z.string().trim().optional(),
		preferedName: z.string().trim().optional(),
		isPreferedName: z.boolean().default(false).optional(),
	}),
	email: z
		.string({ message: "Email is required" })
		.email("Invalid email address"),
	username: z
		.string({ message: "Username is required" })
		.min(3, "Username must be at least 3 characters"),
	password: z
		.string({ message: "Password is required" })
		.min(8, "Password must be at least 8 characters")
		.max(16, "Password must be less than 16 characters")
		.regex(
			/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$&*?])/,
			"Password must contain an uppercase letter, a lowercase letter, a number, and a special character",
		),
});

module.exports = { userSignUpSchema };

const { z } = require("zod");

const userSignUpSchema = z.object({
	name: z.object({
		firstName: z
			.string({ required_error: "First name is required" })
			.trim()
			.min(1, "First name cannot be empty"),
		lastName: z
			.string({ required_error: "Last name is required" })
			.trim()
			.min(1, "Last name cannot be empty"),
		middleName: z.string().trim().optional(),
		preferedName: z.string().trim().optional(),
		isPreferedName: z.boolean().default(false).optional(),
	}),
	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid email address"),
	username: z
		.string({ required_error: "Username is required" })
		.min(3, "Username must be at least 3 characters"),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, "Password must be at least 8 characters")
		.max(16, "Password must be less than 16 characters")
		.regex(
			/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$&*?])/,
			"Password must contain an uppercase letter, a lowercase letter, a number, and a special character",
		),
});

module.exports = { userSignUpSchema };

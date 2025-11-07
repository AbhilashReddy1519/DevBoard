// usercontroller.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import {
	userSignUpSchema,
	UserSignUpSchema as SignUpData,
} from "../validations/userData";
import bcrypt from "bcryptjs";

export const signUp = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	// 1. Validate the request body using Zod
	const validationResult = userSignUpSchema.safeParse(req.body);

	if (!validationResult.success) {
		return res.status(400).json({
			message: "Invalid input data",
			errors: validationResult.error.flatten().fieldErrors,
		});
	}

	// The validated data is guaranteed to match the schema's type
	const { name, email, username, password } =
		validationResult.data as SignUpData;

	try {
		// 2. Check if a user with the same email or username already exists
		const existingUser: IUser | null = await User.findOne({
			$or: [{ email }, { username }],
		});

		if (existingUser) {
			return res.status(409).json({
				message: "User with this email or username already exists.",
			});
		}

		// 3. 🛡️ Security Fix: Hash the password
		const salt: string = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// 4. Create a new user object with the HASHED password
		const newUser: IUser = new User({
			name: name, // The nested name object from Zod validation
			email: email,
			username: username,
			password: hashedPassword, // Store the HASHED password
		});

		// 5. Save the user to the database
		const savedUser = await newUser.save();

		// 6. Success Response
		return res.status(201).json({
			message: "User created successfully",
			userId: savedUser._id,
		});
	} catch (error) {
		console.error("Error during sign up:", error);

		// Ensure ALL paths return a Response object
		return res
			.status(500)
			.json({ message: "Server error during user creation." });
	}
};

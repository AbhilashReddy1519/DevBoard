const User = require("../models/user");
const { userSignUpSchema } = require("../validations/userData");
// const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
	// 1. Validate the request body using Zod
	const validationResult = userSignUpSchema.safeParse(req.body);

	if (!validationResult.success) {
		// If validation fails, send back a 400 error with details
		return res.status(400).json({
			message: "Invalid input data",
			errors: validationResult.error.flatten().fieldErrors,
		});
	}

	// The validated and potentially transformed data is in validationResult.data
	const { name, email, username, password } = validationResult.data;

	try {
		// 2. Check if a user with the same email or username already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser) {
			return res.status(409).json({
				message: "User with this email or username already exists.",
			});
		}

		// 3. Hash the password before saving
		// const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

		// 4. Create a new user object matching the Mongoose schema
		const newUser = new User({
			name: name, // The 'name' object comes directly from the validated data
			email: email,
			username: username,
			password: password,
		});

		// 5. Save the user to the database
		await newUser.save();

		res.status(201).json({
			message: "User created successfully",
			userId: newUser._id,
		});
	} catch (error) {
		console.error("Error during sign up:", error);
		res.status(500).json({ message: "Server error during user creation." });
	}
};

module.exports = { signUp };

const express = require("express");
const User = require("../models/user");
const router = express.Router();

// router.post("/signup", async (req, res) => {
// 	const data = req.body;
// 	const user = new User({ ...data });
// 	await user.save();
// 	res.send("Success");
// });

router.post("/signup", async (req, res) => {
	try {
		// Defensive: ensure req.body exists and is valid JSON/urlencoded
		// if (!req.body || Object.keys(req.body).length === 0) {
		// 	return res.status(400).json({
		// 		message:
		// 			"Request body missing or invalid JSON. Ensure Content-Type: application/json and valid JSON body.",
		// 	});
		// }

		// Make sure you are sending `username` from your client/form
		// const { firstName, lastName, email, username, password } =
		// 	req.body || {};

		// Check if all required fields are present
		// if (!firstName || !lastName || !email || !username || !password) {
		// 	return res
		// 		.status(400)
		// 		.json({ message: "All fields are required." });
		// }
		console.log("Request headers:", req.headers);
		console.log("Request body:", req.body);

		const user = new User({
			name: { firstName, lastName },
			email,
			username,
			password,
		});
		await user.save();
		console.log(user._id);
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log(req.body);
		// Send back a meaningful error response
		if (error.name === "ValidationError") {
			// Extract validation messages for a cleaner response
			const messages = Object.values(error.errors).map(
				(val) => val.message,
			);
			return res
				.status(400)
				.json({ message: "Validation failed", errors: messages });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
});

module.exports = router;

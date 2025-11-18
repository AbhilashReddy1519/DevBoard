import { connect } from "mongoose";

import { MONGODB_URL , MONGODB_DB_NAME } from "./index";

/**
 * Establishes connection to the MongoDB database.
 */
const connectDB = async (): Promise<void> => {
	// Basic check to prevent connection with empty URI if .env failed to load
	if (!MONGODB_URL || !MONGODB_DB_NAME) {
		console.error(
			"❌ Error: MONGODB_URL or MONGODB_DB_NAME is not defined in environment variables.",
		);
		return;
	}

	try {
		const connectionString = `${MONGODB_URL}/${MONGODB_DB_NAME}`;

		// Mongoose Connect returns a Promise<Mongoose>
		await connect(connectionString);

		console.log("✅ MongoDB connection successful");
	} catch (error) {
		// Explicitly type the caught error as 'any' or 'unknown' (better)
		console.error("🛑 MongoDB connection failed:");
		console.error(error);

		// Optionally, exit the process if the database connection is critical
		process.exit(1);
	}
};

connectDB();

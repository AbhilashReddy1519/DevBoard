// 1. Use ESM import syntax for Mongoose
import { connect } from "mongoose";

// 2. Import dotenvx using standard module import (or a simple require for configuration)
// Note: In a TypeScript file, ensure you have the appropriate module resolution settings.
require("@dotenvx/dotenvx").config();

// 3. Define the constants with explicit string types and handle potential undefined
const MONGO_DB_URI: string = process.env.MONGODB_URL || "";
const DB_NAME: string = process.env.MONGODB_DB_NAME || "";

/**
 * Establishes connection to the MongoDB database.
 */
const connectDB = async (): Promise<void> => {
	// Basic check to prevent connection with empty URI if .env failed to load
	if (!MONGO_DB_URI || !DB_NAME) {
		console.error(
			"❌ Error: MONGODB_URL or MONGODB_DB_NAME is not defined in environment variables.",
		);
		return;
	}

	try {
		const connectionString = `${MONGO_DB_URI}/${DB_NAME}`;

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

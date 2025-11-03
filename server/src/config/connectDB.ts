const { connect } = require("mongoose");
require("@dotenvx/dotenvx").config();

const MONGO_DB_URI = process.env.MONGODB_URL || "";
const DB_NAME = process.env.MONGODB_DB_NAME || "";

const connectDB = async () => {
	try {
		await connect(`${MONGO_DB_URI}/${DB_NAME}`,);
		console.log("MongoDB connection successful");
	} catch (error) {
		console.error(error);
	}
};

connectDB();

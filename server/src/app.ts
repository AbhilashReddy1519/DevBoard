// External Modules
import express, { Express } from "express";
import dotenv from "@dotenvx/dotenvx"; // Use the standard dotenv import for type safety
// NOTE: If using @dotenvx/dotenvx, its documentation will guide the correct TS import/initialization.
// Assuming standard environment setup for simplicity:
dotenv.config();

// Local Modules
// Import statements for modules that export functions or variables:
import "./config/connectDB";
import userRouter from "./routes/userRoutes";

const app: Express = express(); // Explicitly type the app object

// --- Middleware ---
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// --- Local Routes ---
app.use("/user", userRouter);

// --- Server Start ---
// 1. Get PORT from environment variables.
// 2. Use the 'as string' type assertion or the nullish coalescing operator (??)
//    to handle 'string | undefined' type from process.env.
const portString = process.env.PORT || "1000";
const PORT: number = parseInt(portString, 10);

app.listen(PORT, () => {
	console.log(`⚡️ Server is running on port ${PORT}...`);
});

// // External Modules
// import express from "express";
// require("@dotenvx/dotenvx").config(); // with dotenvx now we can encrypt .env files

// // Local Modules
// require("./config/connectDB");
// const userRouter = require("./routes/userRoutes");

// const app = express();

// //middleware
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// //Local Routes
// app.use("/user", userRouter);

// // Server Start
// const PORT = process.env.PORT;
// app.listen(PORT || 1000, () => {
// 	console.log(`server is running...`);
// });

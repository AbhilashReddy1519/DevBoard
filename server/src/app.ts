// External Modules
import express, { Express } from "express";
import dotenv from "@dotenvx/dotenvx";
// Assuming standard environment setup for simplicity:
dotenv.config();

// Local Modules
import "./config/connectDB";
import userRouter from "./routes/userRoutes";

const app: Express = express(); 

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
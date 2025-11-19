// External Modules
import express, { Express } from "express";
// Local Modules
import "./config/connectDB";
import router from "./routes/index";


const app: Express = express(); 

// --- Middleware ---
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// --- Local Routes ---
app.use("/api", router);

// --- Server Start ---
// 1. Get PORT from environment variables.
// 2. Use the 'as string' type assertion or the nullish coalescing operator (??)
//    to handle 'string | undefined' type from process.env.
const portString = process.env.PORT || "1000";
const PORT: number = parseInt(portString, 10);

app.listen(PORT, () => {
	console.log(`⚡️ Server is running on port ${PORT}...`);
});
import app from './app';
import "./config/connectDB";

// --- Server Start ---
// 1. Get PORT from environment variables.
// 2. Use the 'as string' type assertion or the nullish coalescing operator (??)
//    to handle 'string | undefined' type from process.env.
const portString = process.env.PORT || "1000";
const PORT: number = parseInt(portString, 10);

app.listen(PORT, () => {
	console.log(`⚡️ Server is running on port ${PORT}...`);
});
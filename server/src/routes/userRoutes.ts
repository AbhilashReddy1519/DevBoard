// userRoutes.ts
import express from "express";
import { signUp } from "../controllers/userController"; // Import the controller function

const router = express.Router();

// Assign the controller function directly to the route
router.post("/signup", signUp);

// Use ESM export
export default router;
export type JWTPayloadShape = {
	userId: string;
	role?: string;
	iat?: number;
};

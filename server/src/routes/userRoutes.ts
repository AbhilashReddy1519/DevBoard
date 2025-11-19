// userRoutes.ts
import express from "express";
import { login, signUp } from "../controllers/userController"; 
import { validate } from "../middlewares/validate";
import { userSignUpSchema } from "../validations/userSignUp";
import { userLoginSchema } from "../validations/userLogin";

const router = express.Router();

// Assign the controller function directly to the route
router.post("/signup",validate(userSignUpSchema), signUp);
router.post("/login", validate(userLoginSchema), login);

// Use ESM export
export default router;

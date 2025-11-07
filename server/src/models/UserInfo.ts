import { model, Schema, Types, Document, Model } from "mongoose";

// --- 1. Interface Definition ---

/**
 * Defines the structure for the UserInfo document.
 */
export interface IUserInfo extends Document {
	userId: Types.ObjectId;
	name: string;
	username: string;
	email: string;
	education?: string;
	skills?: string[]; // Array of strings
	role?: string;
	goals?: string[]; // Array of strings
	github?: string;
	leetcode?: string;

	// Mongoose Timestamps
	createdAt: Date;
	updatedAt: Date;
}

// --- 2. Schema Definition ---

const userInfoSchema: Schema<IUserInfo> = new Schema(
	{
		userId: {
			// FIX: Use Schema.Types.ObjectId to correctly reference the Mongoose type
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		education: String, // Simplified syntax for type String
		skills: [String], // Simplified syntax for Array of Strings
		role: String,
		goals: [String],
		github: String,
		leetcode: String,
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt
	},
);

// --- 3. Model Export ---

const UserInfo: Model<IUserInfo> = model<IUserInfo>("UserInfo", userInfoSchema);

// Use ESM export instead of CommonJS 'module.exports'
export default UserInfo;

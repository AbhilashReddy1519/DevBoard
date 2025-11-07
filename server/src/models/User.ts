import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the TypeScript Interface for the Document
// This describes the structure of a single User document retrieved from MongoDB.
export interface IUserName {
	firstName: string;
	middleName?: string;
	lastName: string;
	preferedName?: string;
	isPreferedName?: boolean;
}

export interface IUser extends Document {
	name: IUserName;
	email: string;
	username: string;
	password: string; // Stored as a hash
	role?: "user" | "admin";
	isVerifed?: boolean;
	// Mongoose adds these properties because of { timestamps: true }
	createdAt: Date;
	updatedAt: Date;
}

// 2. Define the Mongoose Schema
const userSchema: Schema<IUser> = new Schema(
	{
		name: {
			isPreferedName: {
				type: Boolean,
				default: false,
			},
			preferedName: {
				type: String,
				trim: true,
			},
			firstName: {
				type: String,
				required: true,
				trim: true,
			},
			middleName: {
				type: String,
				trim: true,
			},
			lastName: {
				type: String,
				required: true,
				trim: true,
			},
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isVerifed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

// 3. Create the Model and Export (using ESM syntax to prevent redeclaration error)
// The Model<IUser> type provides strong typing for all static and instance methods.
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;

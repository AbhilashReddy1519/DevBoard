import { model, Schema, Types, Document, Model } from "mongoose";

// --- 1. Task Sub-Document Interfaces (ITaskStruct) ---

// Defines the structure of a single task object within the 'task' array
export interface ITaskStruct extends Document {
	title: string;
	description: string;

	// endDate structure correction: Mongoose expects simple types for date fields.
	// We'll separate the date and the boolean flag.
	endDate?: Date;
	isEnd?: boolean;

	priority: "low" | "normal" | "medium" | "high";

	// completedOn structure correction: separate the date and the boolean flag.
	completedOn?: Date;

	// The main flag for completion
	isCompleted: boolean;

	// Mongoose Sub-documents get their own timestamps (if enabled globally, but here we keep it clean)
}

// --- 2. Main Document Interface (ITask) ---

// Defines the structure of the document stored in the 'tasks' collection
export interface ITask extends Document {
	userId: Types.ObjectId;
	// An array of the sub-document type
	task: Types.DocumentArray<ITaskStruct>;

	// Global Document Timestamps
	createdAt: Date;
	updatedAt: Date;
}

// --- 3. Task Sub-Schema Definition ---

// Define the schema for the sub-document (a single task item)
const taskStructSchema: Schema<ITaskStruct> = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},

		// Corrected Mongoose structure: nested definitions are incorrect for simple fields.
		endDate: {
			type: Date,
		},
		// Separate boolean flag for clarity, if needed outside of the main Date field
		isEnd: {
			type: Boolean,
			default: false,
		},

		priority: {
			type: String,
			enum: ["low", "normal", "medium", "high"],
			default: "normal",
			required: true,
			trim: false,
		},

		// Corrected Mongoose structure: Date field and completion flag are separate
		completedOn: {
			type: Date,
			default: null, // Default to null if not completed
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		// Sub-schemas can also have timestamps, but usually, the parent schema tracks them.
		_id: true, // Ensure sub-documents get an _id
		timestamps: false,
	},
);

// --- 4. Main Task Schema Definition ---

const taskSchema: Schema<ITask> = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId, // FIX: Use Schema.Types for Mongoose type reference
			ref: "User",
			required: true,
		},
		// Define the array using the sub-schema
		task: {
			type: [taskStructSchema],
			default: [], // Good practice to default array to empty
		},
	},
	{
		timestamps: true, // Parent document timestamps
	},
);

// --- 5. Model Export ---

const Task: Model<ITask> = model<ITask>("Task", taskSchema);

// Use ESM export instead of CommonJS 'module.exports'
export default Task;

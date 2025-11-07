import { model, Schema, Types, Document, Model } from "mongoose";

// --- 1. To-Do Sub-Document Interface (ITodoStruct) ---

// Defines the structure of a single to-do item within the array
export interface ITodoStruct extends Document {
	todo: string;
	isComplete: boolean;
	createdAt: Date; // Note: Although you set default: Date.now, the outer timestamps will handle the main document.

	// Mongoose Sub-document Timestamps (if enabled by timestamps: true in the sub-schema options)
	updatedAt: Date;
}

// --- 2. Main Document Interface (ITodo) ---

// Defines the structure of the document stored in the 'todos' collection
export interface ITodo extends Document {
	userId: Types.ObjectId;
	// An array of the sub-document type
	todo: Types.DocumentArray<ITodoStruct>;

	// Global Document Timestamps
	createdAt: Date;
	updatedAt: Date;
}

// --- 3. To-Do Sub-Schema Definition (todoStructSchema) ---

const todoStructSchema: Schema<ITodoStruct> = new Schema(
	{
		todo: {
			type: String,
			required: true,
			trim: true,
		},
		isComplete: {
			type: Boolean,
			default: false,
		},
		// The createdAt field here is redundant if 'timestamps: true' is used below,
		// but kept to match your original structure.
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		_id: true, // Ensure sub-documents get an _id
		timestamps: true, // Adds createdAt and updatedAt to the sub-document
	},
);

// --- 4. Main To-Do Schema Definition (todoSchema) ---

const todoSchema: Schema<ITodo> = new Schema(
	{
		userId: {
			// FIX: Use Schema.Types.ObjectId to correctly reference the Mongoose type
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		// Define the array using the sub-schema
		todo: {
			type: [todoStructSchema],
			default: [], // Good practice to default array fields to empty
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt to the main document
	},
);

// --- 5. Model Export ---

// Note: Renamed the variable from 'Todo' (Schema) to 'TodoModel' or simply 'ToDo'
const ToDoModel: Model<ITodo> = model<ITodo>("Todo", todoSchema);

// Use ESM export instead of CommonJS 'module.exports'
export default ToDoModel;

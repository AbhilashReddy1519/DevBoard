import { model, Schema, Types, Document, Model } from "mongoose";

// --- 1. Habit Sub-Document Interface (IHabitStruct) ---

// Defines the structure of a single habit object within the array
export interface IHabitStruct extends Document {
	habitName: string;
	goal: "Daily" | "Weekly";
	streak?: number;
	highestStreak?: number;
	createdOn: Date;
	// completedDates is an array of Dates (when the habit was marked complete)
	completedDates: Date[];
}

// --- 2. Main Document Interface (IHabit) ---

// Defines the structure of the document stored in the 'habits' collection
export interface IHabit extends Document {
	userId: Types.ObjectId;
	// An array of the sub-document type
	habit: Types.DocumentArray<IHabitStruct>;

	// Global Document Timestamps (from parent schema)
	createdAt: Date;
	updatedAt: Date;
}

// --- 3. Habit Sub-Schema Definition (habitStructSchema) ---

const habitStructSchema: Schema<IHabitStruct> = new Schema(
	{
		habitName: {
			type: String,
			required: true,
			trim: true,
		},
		goal: {
			type: String,
			enum: ["Daily", "Weekly"],
			default: "Daily",
		},
		streak: {
			type: Number,
			default: 0, // Best practice to initialize numbers
		},
		highestStreak: {
			type: Number,
			default: 0,
		},
		createdOn: {
			type: Date,
			default: Date.now,
		},
		completedDates: {
			type: [Date], // FIX: Correctly specify an array of Dates using [Date]
			default: [],
		},
	},
	{
		_id: true, // Ensure sub-documents get an _id
		timestamps: true, // Timestamps on the habit item itself
	},
);

// --- 4. Main Habit Schema Definition (habitSchema) ---

const habitSchema: Schema<IHabit> = new Schema(
	{
		userId: {
			// FIX: Use Schema.Types.ObjectId to correctly reference the Mongoose type
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		// Define the array using the sub-schema (renamed 'task' to 'habit' for clarity)
		habit: {
			type: [habitStructSchema],
			default: [],
		},
	},
	{
		timestamps: true, // Timestamps on the main document
	},
);

// --- 5. Model Export ---

const Habit: Model<IHabit> = model<IHabit>("Habit", habitSchema);

// Use ESM export instead of CommonJS 'module.exports'
export default Habit;

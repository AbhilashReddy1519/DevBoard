// analytics.ts
import { model, Schema, Types, Document, Model } from "mongoose";

// --- INTERFACES ---

export interface IATasks {
	completed: number;
	pending: number;
}

export interface IAHabits {
	habits: string[];
	streaks: number[];
}

export interface IATodos {
	completed: number;
	pending: number;
}

// The main document interface
export interface IAnalytics extends Document {
	userId: Types.ObjectId;
	tasks: IATasks;
	habits: IAHabits;
	todos: IATodos;
	// Mongoose will automatically add timestamps if configured
	createdAt: Date;
	updatedAt: Date;
}

// --- SCHEMA DEFINITION ---

const analyticsSchema: Schema<IAnalytics> = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		// To match the interfaces, explicitly define the nested types
		// or rely on Mongoose's ability to infer from simple schemas.
		// Since 'tasks', 'habits', and 'todos' are complex objects,
		// it's best to define their structure or keep them as 'Object'
		// with a 'default' for safe initialization.
		tasks: {
			type: Object,
			default: { completed: 0, pending: 0 } as IATasks, // Provide default structure
		},
		habits: {
			type: Object,
			default: { habits: [], streaks: [] } as IAHabits, // Provide default structure
		},
		todos: {
			type: Object,
			default: { completed: 0, pending: 0 } as IATodos, // Provide default structure
		},
	},
	{
		timestamps: true, // Recommended: enables createdAt and updatedAt properties
	},
);

// --- MODEL EXPORT ---

// Type the model instance correctly
const Analytics: Model<IAnalytics> = model<IAnalytics>(
	"Analytics",
	analyticsSchema,
);

// Use ESM export instead of CommonJS 'module.exports'
export default Analytics;

// External Modules
const { model, Schema, Types } = require("mongoose");

const habitStruct = new Schema(
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
		},
		highestStreak: {
			type: Number,
		},
		createdOn: {
			type: Date,
			default: Date.now,
		},
		completedDates: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

const habitSchema = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			required: true,
			ref: "User",
		},
		task: [habitStruct],
	},
	{
		timestamps: true,
	},
);

const Habit = model("Habit", habitSchema);

module.exports = Habit;

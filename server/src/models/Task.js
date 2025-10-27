//External Modules
const { model, Schema, Types } = require("mongoose");

const taskStruct = new Schema(
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
		startDate: {
			type: Date,
			required: true,
			default: Date.now,
		},
		endDate: {
			type: Date(),
			idEnd: {
				type: Boolean,
				default: false,
			},
		},
		priority: {
			type: String,
			enum: ["low", "normal", "medium", "high"],
			default: "normal",
			required: true,
			trim: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		completedOn: {
			type: Date,
			isCompleted: {
				type: Boolean,
				default: false,
			},
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const taskSchema = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
		task: [taskStruct],
	},
	{
		timestamps: true,
	},
);

const Task = model("Task", taskSchema);

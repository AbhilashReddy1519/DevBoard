const { model, Schema, Types } = require("mongoose");

const TodoStruct = new Schema(
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
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

const Todo = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
		todo: [TodoStruct],
	},
	{
		timestamps: true,
	},
);

const ToDo = model("Todo", Todo);

module.exports = Todo;

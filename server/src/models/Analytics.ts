const { model, Schema, Types } = require("mongoose");

const analyticsSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		required: true,
		ref: "User",
	},
	tasks: {
		type: Object,
	},
	habits: {
		type: Object,
	},
	todos: {
		type: Object,
	},
});

const Analytics = model("Analytics", analyticsSchema);

module.exports = Analytics;

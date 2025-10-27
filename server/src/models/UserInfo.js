const { model, Schema, Types } = require("mongoose");

const userInfoSchema = new Schema({
	userId: {
		type: Types.ObjectId,
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
	education: String,
	skills: [String],
	role: String,
	goals: [String],
	github: String,
	leetcode: String,
});


const UserInfo = model("UserInfo", userInfoSchema);
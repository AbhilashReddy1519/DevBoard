// External Modules
const { model, Schema } = require("mongoose");

const userSchema = new Schema(
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

const User = model("User", userSchema);

module.exports = User;

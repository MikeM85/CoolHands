var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	displayname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: { index: { unique: true } }
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: { index: { unique: true } },
	},
	city: {
		type: String,
		required: true,
	},
	stateName: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
		default: "https://picsum.photos/200",
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

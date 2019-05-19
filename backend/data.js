var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DataSchema = new Schema({
	userID: {
		id: Number,
		"sequence_value": 0
	},
	email: {
		type: String,
		required: true,
		unique: { index: { unique: true } }
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNum:{
		type: String,
		required: true,
	},
	// phoneNum: {
	// 	type: String,
	// 	default: "https://picsum.photos/200",
	// },
	// date: {
	// 	type: Date,
	// 	default: Date.now,
	// },
	// isVerified: {
	// 	type: Boolean,
	// 	default: false
	passwordResetToken: String,
	passwordResetExpires: Date
});

var User = mongoose.model("Data", DataSchema);

module.exports = User;

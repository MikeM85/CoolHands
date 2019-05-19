var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrdersSchema = new Schema({
	orderID: {
		"_id": 1,
		"sequence_value": 0
	},
	email: {
		type: String,
		required: true,
		unique: { index: { unique: true } }
	},
	orderType: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	timeStamp: {
		type: Date,
		default: Date.now,
	},
	timeFrame:{
		type: String,
		required: true,
	},
	weight: {
		type: String,
		required: true,
	},
	instructions:{
		type: String,
	},
	payMeth: {
		type: String,
		required: true,
	},
	status:{
		type: String,
		required: true,
		default: "pending"
	},
	timeCompleted: {
		type: String,
		default: ""
	},
	isApproved: {
		type: Boolean,
		default: false
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
	// passwordResetToken: String,
	// passwordResetExpires: Date
});

var Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;

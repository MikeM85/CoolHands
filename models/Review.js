var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  YelpId: {
    type: String,
    required: true
  },
  displayname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  restaurantname: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  createdate: {
    type: Date,
    default: Date.now
  },
  changedate: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Note model
module.exports = Review;

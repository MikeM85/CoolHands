var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  yelpid: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  name: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true    
  },
  yelprating: {
    type: String,
    required: true
  },
  yelpreviewcount: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;

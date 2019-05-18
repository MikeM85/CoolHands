var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var TokenSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 86400
  }
});

// This creates our model from the above schema, using mongoose's model method
var Token = mongoose.model("Token", TokenSchema);

// Export the Note model
module.exports = Token;

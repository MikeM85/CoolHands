const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

// Defines middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const db = require("./config/keys").MONGODB_URI;

mongoose.connect(
  db, {
      useNewUrlParser: true
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Start the API server
app.listen(PORT,HOST, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!!!!`);
});
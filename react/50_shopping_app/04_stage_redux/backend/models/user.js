const mongoose = require("mongoose");

let schema = mongoose.Schema({
  username: { unique: true, type: String },
  password: String,
});

module.exports = mongoose.model("User", schema);

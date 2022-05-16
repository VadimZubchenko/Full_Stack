const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: { index: true, type: String },
  ttl: Number,
  token: String,
});

module.exports = mongoose.model("Session", schema);

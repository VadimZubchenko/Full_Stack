const mongoose = require("mongoose");

const schema = mongoose.Schema({
  type: String,
  count: Number,
  price: Number,
  user: { index: true, type: String },
});

module.exports = mongoose.model("Item", schema);

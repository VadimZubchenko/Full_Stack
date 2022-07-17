const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

heroSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;

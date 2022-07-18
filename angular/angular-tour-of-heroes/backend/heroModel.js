const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
});
//.set if you need to use Mongoose _id as a id;
heroSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;

const mongoose = require("mongoose");

const empoleeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  company: String,
  email: String,
  phone: Number,
  date: Date,
  city: String,
  state: String,
  zcode: Number,
  profile: String,

  ////
});
/////colletion
const Addnew = new mongoose.model("Addnew", empoleeSchema);

module.exports = Addnew;

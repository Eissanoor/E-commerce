const mongoose = require("mongoose");

const EmpoleeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  store: String,
  email: String,
  phone: Number,
  joinDate: Date,
  des: String,
  profile: String,

  //
});
/////colletion
const Addcustomer = new mongoose.model("Addcustomer", EmpoleeSchema);

module.exports = Addcustomer;

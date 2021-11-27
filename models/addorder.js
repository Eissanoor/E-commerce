const mongoose = require("mongoose");

const EmpoleeSchema = new mongoose.Schema({


        firstname: String,
        lastname: String,
        store: String,
        email: String,
        phone: Number,
        joinDate: Number,
        des: String,
        profile: String

        //
    })
    /////colletion
const Addorder = new mongoose.model("Addorder", EmpoleeSchema);

module.exports = Addorder;
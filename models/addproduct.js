const mongoose = require("mongoose");

const empoleeSchema = new mongoose.Schema({

        firstname: String,
        lastname: String,
        store: String,
        email: String,
        value: Number,
        value2: Number,
        phone: Number,
        joinDate: Date,
        des: String,
        profile: String

        //


    })
    /////colletion
const Addpro = new mongoose.model("Addpro", empoleeSchema);

module.exports = Addpro;
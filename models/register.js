const mongoose = require("mongoose");

const empoleeSchema = new mongoose.Schema({

        name: {
            type: String
        },
        email: String,
        gender: String,
        gender2: String,
        username1: String,
        password: String,
        cpassword: String,
        phone: Number,


        //

    })
    /////colletion
const Register = new mongoose.model("Registerr", empoleeSchema);

module.exports = Register;
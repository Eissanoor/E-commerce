const mongoose = require("mongoose");

const empoleeSchema = new mongoose.Schema({
        email: String,
        name: String,
        date: Date,
        shippingAddress: String,
        street: Number,
        city: String,
        postcode: Number,
        counrty: String,

        price: Number,
        quantity: { type: Number },


        profile: String,
        brand: String,
        material1: String,
        location1: String,
        material2: String,
        location2: String,
        material3: String,
        location3: String,
        material4: String,
        location4: String,
        material5: String,
        location5: String,
        OrderId: String,
        //
        //////////////

        bag: Number,
        shoes: Number,
        laptop: Number,




    })
    /////colletion
const Order = new mongoose.model("Order", empoleeSchema);

module.exports = Order;
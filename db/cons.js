const mongoose = require("mongoose")

const DB = 'mongodb+srv://eissanoor:Eisa.123@cluster0.bpuor.mongodb.net/khaaaad?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("good ho gaya");

}).catch((e) => console.log("no connection"))
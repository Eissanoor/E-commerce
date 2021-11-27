const mongoose = require("mongoose")
const MONGODB_URL = 'mongodb+srv://eissanoor:Eisa.123@cluster0.bpuor.mongodb.net/khaaaad?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false


}).then(() => {
    console.log("good ho gaya");
    ///

}).catch((e) => console.log("no connection"))
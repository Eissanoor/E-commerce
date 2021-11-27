const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
// const MONGODB_URL = 'mongodb+srv://eissanoor:Eisa.123@cluster0.bpuor.mongodb.net/khaaaad?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://eissanoor:Eisa.123@cluster0.bpuor.mongodb.net/khaaaad?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
    // useMongoClient: true

}).then(() => {
    console.log("good ho gaya");
    ///

}).catch((e) => console.log(e))
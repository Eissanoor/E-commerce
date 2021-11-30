const express = require('express')
const app = express();
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
dotenv.config({ path: 'config.env' })
const multer = require('multer');
const crypto = require("crypto");
////
const Order = require("./models/order")

const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function(req, file, cb) {

        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 100000 }
});
app.use('/profile', express.static('upload'));

app.post("/upload", (req, res) => {

    res.json({
        success: 1,
        profile_url: `http://localhost:2000/profile/${req.file.filename}`

    })
    console.log(req.file);
})

//registeration module

///randam number generate
const Reset = require("./models/otp");

////phone authentication
const config = require("./config1")
const client = require('twilio')(config.accountID, config.authToken);

const Addpro = require("./models/addproduct")
    //database
require("./db/cons");

///Add new costomer
const Addnew = require("./models/addnew");
const Addorder = require("./models/addorder")

const port = process.env.PORT || 8000
    //mongodb+srv://eissanoor:Eisa.123@sasa.m7pfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//hbs for 
//views for
const templetpath = path.join(__dirname, "./templet/views");
//partials for
const partialspath = path.join(__dirname, "./templet/partials");



app.set("view engine", "hbs");

app.set("views", templetpath);
hbs.registerPartials(partialspath)
const staticpath = path.join(__dirname, "./public");

app.use(express.static(staticpath));

app.get('/', (req, res) => {

        res.send("indexakjsdkjsd")
    })
    //registeration page
app.get("/register", async(req, res) => {

    const getmens = await Register.find({});
    res.status(201).send(getmens);

})
const Register = require("./models/register");
app.post("/register", async(req, res) => {

        try {
            // const password = req.body.password;
            // const cpassword = req.body.cpassword;
            // if (password === cpassword) {
            const registerEmp = new Register({
                    name: req.body.name,
                    email: req.body.email,
                    gender: req.body.gender,
                    gender2: req.body.gender2,
                    username1: req.body.username1,
                    password: req.body.password,
                    cpassword: req.body.cpassword,
                    phone: req.body.phone

                })
                ///api
                // res.send(registerEmp);

            //database collection ok 
            const registered = await registerEmp.save();
            res.status(201).send(registered);

            // } else {
            //     res.status(404).send("Incorrect your password not machting to each other");
            // }



        } catch (e) {

            res.status(400).send(e);
        }


    })
    //login page
app.get("/login", (req, res) => {

        res.render("login");

    })
    //help of post//craete user over database

////hit lower login pages

app.get("/index", (req, res) => {

        res.render("index");

    })
    //loging check

app.post("/login", async(req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email })
        if (useremail.password === password) {
            res.status(201).send("sucessful your login");
        } else {
            res.status(404).send("password are not machting")
        }

    } catch (error) {
        res.status(400).send("invalid email")

    }

})

app.post("/otp", async(req, res) => {


    try {

        const email = req.body.email;
        console.log(email);

        const useremail = await Register.findOne({ email })
        console.log(useremail);

        if (useremail.email === email) {

            let otp = Math.floor(Math.random() * 1000);
            res.sendStatus(otp);
            console.log(otp)

        } else {
            res.status(400).send("you are not correct email");

        }




        // res.sendStatus(otp);


    } catch (e) {
        res.status(400).send(" invalid your email");
    }
})

app.get("/otp", (req, res) => {

    const otp = client.messages.create({
            body: '     Hello zakirya senga jkashd yi',
            to: '+923015199394',
            from: '+18508206363'
        }).then(message => console.log(message))
        // here you can implement your fallback code
        .catch(error => console.log(error))
})

/////login otp

app.get("/varify", (req, res) => {

    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: `${req.query.channel}`
        }).then((data) => {
            res.status(200).send(data)
        })
})

app.get("/varify1", (req, res) => {
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: `${req.query.code}`
        }).then((data) => {
            res.status(200).send(data)
        })

})

///add costomer
app.post("/addnew", upload.single('profile'), async(req, res) => {
    try {
        const addEmp = new Addnew({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            date: new Date(),
            city: req.body.city,
            state: req.body.state,
            zcode: req.body.zcode,
            profile: req.file.filename,


        })

        ///api
        // res.send(registerEmp);

        //database collection ok 
        const addemploee = await addEmp.save();
        res.status(201).send(addemploee);

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }


})

app.get("/addnew", async(req, res) => {

    const getmens = await Addnew.find({});
    res.status(201).send(getmens);
})

app.get("/addnew/:id", async(req, res) => {

    const _id = req.params.id
    const getmens = await Addnew.findById(_id);
    res.status(201).send(getmens);
})

app.patch("/addnew/:id", async(req, res) => {

        try {
            const _id = req.params.id
            const getmens = await Addnew.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            res.status(201).send(getmens);


        } catch (error) {
            res.status(400).send(error)
        }



    })
    //////////add order
app.post("/addorder", upload.single('profile'), async(req, res) => {
    try {
        const addorder = new Addorder({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            store: req.body.store,
            email: req.body.email,
            phone: req.body.phone,
            joinDate: new Date(),
            des: req.body.des,
            profile: req.file.filename
        })
        console.log(req.file.filename);
        ///api
        // res.send(registerEmp);

        //database collection ok 
        const addemploee = await addorder.save();
        res.status(201).send("   new Order is Saved❤");
    } catch (e) {
        res.status(400).send(e);
    }
})
app.get("/addorder", async(req, res) => {

        const getmens = await Addorder.find({}, { firstname: 1, email: 1 });
        res.status(201).send(getmens);
        console.log(getmens);
    })
    ////////// add product

app.post("/addpro", upload.single('profile'), async(req, res) => {
    try {
        const addEmp = new Addpro({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            date: new Date(),
            city: req.body.city,
            state: req.body.state,
            zcode: req.body.zcode,
            profile: req.file.filename,


        })

        ///api
        // res.send(registerEmp);

        //database collection ok 
        const addemploee = await addEmp.save();
        res.status(201).send(addemploee);

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }


})
app.get("/addpro", async(req, res) => {

    const getmens = await Addpro.find({});
    res.status(201).send(getmens);
})

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////ORDER/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

app.post("/order", upload.single('profile'), async(req, res) => {

    const OrderId = crypto.randomBytes(1).toString("hex");
    try {

        const arder = new Order({

            name: req.body.name,
            date: new Date(),
            shippingAddress: req.body.shippingAddress,
            street: req.body.street,
            city: req.body.city,
            postcode: req.body.postcode,
            counrty: req.body.counrty,
            email: req.body.email,
            OrderId: OrderId,
            profile: req.file.filename,
            brand: req.body.brand,
            material1: req.body.material1,
            location1: req.body.location1,
            material2: req.body.material2,
            location2: req.body.location2,
            material3: req.body.material3,
            location3: req.body.location3,
            material4: req.body.material4,
            location4: req.body.location4,
            material5: req.body.material5,
            location5: req.body.location5,

            bag: req.body.bag * 700,
            shoes: req.body.shoes * 500,
            laptop: req.body.laptop * 45000,
        })
        const order = await arder.save();
        res.status(201).send(order);

    } catch (error) {
        res.status(401).send(error)
    }
})

app.get("/order", async(req, res) => {

    const getorder = await Order.find({},

        {
            name: 1,
            date: 1,
            shippingAddress: 1,
            email: 1
        },

    );
    res.status(201).send(getorder);
})



app.listen(port, () => {
    console.log(`server is runing ${port}`);
})


////////

// {
//   "firstname":"eissa",
//   "lastname":"noor",
//   "company":"codecue",
//   "email":"adlsasasdajsasaad11s@gmail.com",
//   "phone":"03361989322",
//   "date":"1482001",
//   "city":"peshawar",
//   "state":"kpk",
//   "zcode":"209"

// }
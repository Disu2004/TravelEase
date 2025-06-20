const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const fs = require("fs");
const homePage = path.join(__dirname, "..", "index.html");
const about = path.join(__dirname, "..", "about.html");
const loginPage = path.join(__dirname, "..", "login.html");
const registerPage = path.join(__dirname, "..", "register.html");
const ContactPage = path.join(__dirname, "..", "contact.html");
const userdata = path.join(__dirname, "..", "userdata.json");
const bookingPage = path.join(__dirname, "..", "booking.html");

const userSchema = require("./userSchema");
app.get('/', (req, res) => {
    res.sendFile(loginPage);
});

const MONGO_URI = "mongodb://127.0.0.1:27017/TravelEase"
const mongoose = require("mongoose")
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })


app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({ extended: true }));
//serve pages
app.get('/home', (req, res) => {
    res.sendFile(homePage)
})
app.get('/about', (req, res) => {
    res.sendFile(about)
})
app.get('/contact', (req, res) => {
    res.sendFile(ContactPage)
});
app.get('/register', (req, res) => {
    res.sendFile(registerPage)
});
app.get('/booking', (req, res) => {
    res.sendFile(bookingPage);
})

//form handling
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email, password: password })
        .then((user) => {
            if (user) {
                res.redirect('/home');
            } else {
                res.send("Invalid credentials");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server error");
        });
});


//Form register
app.post('/register-user',async (req, res) => {
    const user = req.body;
    const newUser = await new userSchema(user);
    if(user.password !== user.confirmPassword){
        return res.send("Passwords do not match");
    }
    await newUser.save();
    res.redirect('/');

});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
});

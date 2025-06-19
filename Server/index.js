const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const fs = require("fs");
const { log } = require("console");
const homePage = path.join(__dirname, "..", "index.html");
const about = path.join(__dirname, "..", "about.html");
const loginPage = path.join(__dirname, "..", "login.html");
const registerPage = path.join(__dirname, "..", "register.html");
const ContactPage = path.join(__dirname, "..", "contact.html");
const userdata = path.join(__dirname, "..", "userdata.json");
const bookingPage = path.join(__dirname, "..", "booking.html");
app.get('/', (req, res) => {
    res.sendFile(loginPage);
});

app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({ extended: true }));
//serve pages
app.get('/home', (req, res) => {
    res.sendFile(homePage)
})
app.get('/about', (req, res) => {
    res.sendFile(about)
})
app.get('/contact' , (req, res) => {   
    res.sendFile(ContactPage)
});
app.get('/register' , (req,res)=>{
    res.sendFile(registerPage)
});
app.get('/booking' , (req,res)=>{
    res.sendFile(bookingPage);
})

//form handling
app.post('/login', (req, res) => {
    console.log(req.body);
    fs.readFile(userdata, 'utf8', (err, data) => {
        console.log(data)
        data.split('\n').forEach((line) => {
            if (line) {
                const user = JSON.parse(line);
                if (user.email === req.body.email && user.password === req.body.password) {
                    console.log("Login successful");
                    res.redirect('/home');
                } else {
                    console.log("Invalid credentials");
                    
                }
            }
        })
    })
});

//Form register
app.post('/register-user', (req, res) => {
    const user = req.body;
    console.log(user);
    fs.appendFile(userdata, JSON.stringify(user) + '\n', (err) => {
        console.log("User data saved !!!")
    });
    res.redirect('/home');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
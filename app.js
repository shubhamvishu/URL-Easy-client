if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authroutes = require("./routes/auth/auth.js");
const passport =require("passport");
const flash = require('express-flash');
const initializePassport = require('./passport-config');
const session = require('express-session');

initializePassport(passport,email => {
    return users.find(user => user.email ===email)
}); 

const users = [];

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/auth",authroutes);
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get("/home",(req,res)=>{
    res.redirect("/");
});
app.get("/",(req,res)=>{
    res.render("home");
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server listenong on port",process.env.PORT || 5000);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authroutes = require("./routes/auth/auth.js");
const passport =require("passport");
const cors = require("cors");

app.use(cors());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/newlink",cors(),(req,res)=>{
    console.log(req.query);
    let originalString = req.query.q;
  
    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(originalString, "utf8");
  
    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString("base64");

    console.log("The encoded base64 string is:", base64String, base64String.substr(base64String.length-7,base64String.length));
    
    res.json({
        originalurl: req.query.q,
        newurl: base64String.substr(base64String.length-7,base64String.length)
    });
});
app.get("/",cors(),(req,res)=>{
    res.send("Hellooo");
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server listening on port",process.env.PORT || 5000);
});

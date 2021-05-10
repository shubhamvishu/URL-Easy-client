const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authroutes = require("./routes/auth/auth.js");
const passport =require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
var Url = require("./models/tinyurl");

mongoose.connect("mongodb+srv://dbUser:FAgDbHV4CzOtFTr2@testdb.k1sm2.mongodb.net/testdb?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true} );

app.use(cors());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/v1/newlink",cors(),(req,res)=>{
    console.log(req.query);
    let originalString = req.query.q;
  
    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(originalString, "utf8");
  
    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString("base64");

    console.log("The encoded base64 string is:", base64String, base64String.substr(base64String.length-7,base64String.length));

    var newUrl = {
        originalurl:originalString,
        newurl:base64String.substr(base64String.length-7,base64String.length),
        date : String(new Date().toLocaleDateString())
    };
    Url.create(newUrl,function(err,urls){
        if(err){
            console.log("Error in creation");
            console.log(err);
        }
        else{
            console.log("Added");
            res.json({
                originalurl: req.query.q,
                newurl: base64String.substr(base64String.length-7,base64String.length)
            });
            //res.send("heyy");
        }
    });
});

app.get("/v1/list",cors(),(req,res) => {
    Url.find({},function(err,urls){
        if(err){
            console.log("Error in redirection");
            //res.redirect('http://localhost:3000');
        }
        else{
            console.log('List Data.......');
            console.log(urls);
            console.log('.......................');
            res.send(urls);
        }
    });
})
app.get("/:tinyurl",cors(),(req,res)=>{
    console.log("shubhammm");
    let redirecturl = "";
    Url.find({newurl:req.params.tinyurl},function(err,urls){
        if(err){
            console.log("Error in redirection");
            //res.redirect('http://localhost:3000');
        }
        else{
            console.log('Data.......')
            console.log(urls)
            console.log('.......................')
            if(urls[0]){
                console.log("INSide");
                console.log(urls[0]);
                console.log(urls[0]?.originalurl);
                redirecturl = urls[0]?.originalurl;
                if(urls[0]?.originalurl)
                    res.send({redirectto:urls[0].originalurl});
            }
        }
    });
    console.log("REDIRECT:",redirecturl);
});
app.get("/",cors(),(req,res)=>{
    res.send("Hellooo");
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server listening on port",process.env.PORT || 5000);
});

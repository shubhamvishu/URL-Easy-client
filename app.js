var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("*",(req,res)=>{
    res.render("home")
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server listenong on port",process.env.PORT || 5000);
});
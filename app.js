var express = require('express');
var app = express();

app.get("*",(req,res)=>{
    res.send("Hello....Server is working");
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server listenong on port",process.env.PORT || 5000);
});
var express = require("express");
var auth = express.Router();
//var bcrypt = require("bcrypt");

const users = []

auth.post("/newuser",async (req,res)=>{
    try{
       // const hashedPassword = await bcrypt.hash(req.body.password,10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: "hashedPassword"
        })
    } catch{

    }
});

module.exports = auth ;

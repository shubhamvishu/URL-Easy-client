var express = require("express");
var auth = express.Router();
var bcrypt = require("bcrypt");

auth.post("/newuser",async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
    } catch{

    }
});

module.exports = auth ;
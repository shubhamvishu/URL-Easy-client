const mongoose = require("mongoose");

console.log("monngoose schema");
var myurlSchema = new mongoose.Schema({
    originalurl:{
        type:String,
    },
    newurl:{
        unique:true,
        type:String
        
    },
    date:{
        type:String
    },
    what:{
        type:String
    }

});

module.exports = mongoose.model("Tinyurl",myurlSchema);

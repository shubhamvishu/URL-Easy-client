const mongoose = require("mongoose");

var myurlSchema = new mongoose.Schema({
    originalurl:{
        type:String,
    },
    newurl:{
        type:String,
        unique:true
    },
    date:{
        type:String
    },
    what:{
        type:String
    }

});

module.exports = mongoose.model("Url",myurlSchema);

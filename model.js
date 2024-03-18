const mongoose = require('mongoose')

const abc = mongoose.Schema({
   restarent_name: {type:String , required: true,},
   description: {type:String , required: true,},
   category : {type: String, required: true,},
   location : {type: String, required: true,},
   available : {type: String, required: true,},
   image : {type:String, required:false,}       
})


module.exports = mongoose.model("Restarent",abc);
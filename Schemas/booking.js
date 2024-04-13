const mongoose = require('mongoose')

const bookins_schema = mongoose.Schema({
    firstName: {type:String , required: true,},
    lastName: {type:String , required: true,},
    email: {type: String , required: true,},
    phoneNo: {type: String, required: true,},
    date: {type:String, required: true,},
    guest : {type: String, required: true,},
    message: {type: String, required: true,}
 
 }) 



 module.exports = mongoose.model('Restarent_booking',bookins_schema)
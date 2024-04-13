const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name: {type:String , required: true,},
    email: {type:String , required: true,},
    registation_date: {type: String , required: true,},
    phoneNo: {type: String, required: true,},
    status: {type:String, required: true,},
    user_image : {type:String, required: true,}
}) 

module.exports = mongoose.model('Users',user_schema)
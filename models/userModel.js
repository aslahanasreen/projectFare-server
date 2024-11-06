const mangoose = require('mongoose')

const userSchema = new mangoose.Schema({
    email:{
        type:String,
        required:true,
        unique : true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    linkedin:{
        type:String
    },
    github:{
        type:String
    },
    profile:{
        type:String
    }
})


const users = mangoose.model('users',userSchema)

module.exports=users
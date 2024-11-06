const mongoose = require('mongoose')

const connectionString = process.env.DB_CONNECTION

mongoose.connect(connectionString).then((res)=>{
    console.log("Server connected to MongoDB Database");
    
}).catch((err)=>{
    console.log(err);
    
})
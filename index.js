require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./routes/routes')
require('./connection/db')
require('./middleware/jwtMiddleware')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(jwt)
pfServer.use(route)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log('Server running at PORT:',+PORT);
    
})

pfServer.get('/',(req,res)=>{
    res.send("<h2> Welcome to Express</h2>")
})
const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            const val = jwt.verify(token,process.env.SECRET_KEY)
            console.log(val);
            req.payload=val.userId
            next()
            
        }
        else{
            res.status(402).json("invalid token!!")
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports = jwtMiddleware
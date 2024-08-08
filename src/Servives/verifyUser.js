const express = require('express')
const app = express();
const jwt=require('jsonwebtoken')
const secretCode="adhya";

const verifyToken=async(req, res, next) => {
 
    const token=req.header('token');
    console.log(token,'tokenn');
    if(!token){
res.status(401).json({error:"access denied no token provided"})

    }

try{
    const data= await jwt.verify(token,secretCode)//decode
    console.log(data.id,"dataaaaa")
    next();
}
    
 catch(err){
    res.status(403).send({ message: 'Invalid token!' });
 }
}


module.exports=verifyToken;
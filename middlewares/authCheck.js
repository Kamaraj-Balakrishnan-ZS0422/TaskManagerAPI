require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const  errorWrapper = require('../utils/errorWrapper');

const authCheck = errorWrapper(async(req,res,next)=>{

    const {authorization} = req.headers;
    if(!authorization || ! authorization.startsWith("Bearer ")) throw {status:400,message:"Not a valid token"};

    const token = authorization.split(" ")[1];
        const {userId:_id,name:userName} = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!_id || !userName) throw {status:401,message:"unathorized user"}
        req.user = {_id,userName}
        next();
});

module.exports = authCheck;
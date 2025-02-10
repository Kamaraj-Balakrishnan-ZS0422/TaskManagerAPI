require('dotenv').config();
const User = require('../models/User');
const errorWrapper = require('../utils/errorWrapper')


const register = errorWrapper(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password) throw {status:400,message:"Bad request.."}
    const user = {userName:username,email,password};
    const newUser = await User.create(user);
    const token = newUser.genToken();
    res.status(201).json({username:newUser.userName,token});
})


const login = errorWrapper( async(req,res)=>{
    const {username:userName,password} = req.body;
    if(!userName || !password) throw {status:400,message:"Enter required Credentials"}
    const user = await User.findOne({userName});
    if(!user) throw {status:400,message:"UserName not Found"}
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect)throw {status:401,message:"Invalid Credentials"}
    const token = user.genToken();
    res.status(200).json({username:user.userName,token});
})

module.exports = {login, register};
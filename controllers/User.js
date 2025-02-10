
const User = require('../models/User');
const errorWrapper = require('../utils/errorWrapper')


const getUser = errorWrapper(async (req,res)=>{
        const {id:userId} = req.params;
        const user = await User.findById(userId);
        if(!user) throw {status:404,message:'No user found.'};
        res.status(200).json({user});
})

const getAllUser = errorWrapper(async (req,res)=>{
    const users = await User.find({});
    if(!users) throw {status:404,message:'No user found.'};
    res.status(200).json({users});
})

module.exports = {
    getUser,
    getAllUser
}
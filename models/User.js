const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    userName:{type:String,required:[true,'username required!']},
    email:{
        type:String,
        required:[true,"email required!"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password required!'],
        minlength:6
    },
    createdAt: {type:Date,default:Date.now()}
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.genToken = function(){
    const token = jwt.sign({userId:this._id,name:this.userName},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY})
    return token;
}

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }

module.exports = mongoose.model('Users',userSchema);
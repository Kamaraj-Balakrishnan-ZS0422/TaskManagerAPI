const { timeStamp } = require('console');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const JobSchema = new Schema({
    company:{
        type : String,
        required: [true,"Company is required"]
    },
    position:{
        type:String,
        required:[true,'position is required']
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model('Jobs',JobSchema);
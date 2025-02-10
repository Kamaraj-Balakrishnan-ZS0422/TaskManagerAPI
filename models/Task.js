const mongoose = require('mongoose');
const {Schema}  = mongoose;

const TaskSchema= new Schema({
    taskName : {type:String,required:true},
    isCompleted : {type:Boolean,default:false}
})

module.exports = mongoose.model('Tasks',TaskSchema)
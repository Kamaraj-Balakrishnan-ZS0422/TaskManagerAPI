const Task = require('../models/Task');
const errorWrapper = require('../utils/errorWrapper');
const getQueryDetails =require('../utils/queryParser');

const createTask = errorWrapper(async(req,res)=>{
        let newTask = req.body;
        const task = await Task.create(newTask);
        return res.status(201).send({task}); 
})

const getAllTasks = errorWrapper(async(req,res)=>{

        const {sortParams,page,limit,select,filters} = getQueryDetails(req.query);
        const tasks = await Task.find(filters).sort(sortParams).select(select).skip(page).limit(limit);
        if(tasks.length === 0) throw { status: 404, message: `No task found.` };
        res.status(200).send({items:tasks.length,tasks});  
})

const getSingleTask = errorWrapper(async(req,res)=>{
        const {id:taskid} = req.params;  
        const task = await Task.findById(taskid);
        if(!task) throw { status: 404, message: `No task found for task id ${taskid}` };
        res.status(200).send({task});
})

const updateTask = errorWrapper(async (req,res)=>{
        const {id:taskid} = req.params;
        const data = req.body;
        const task = await Task.findByIdAndUpdate(taskid,data,{new:true,runValidators:true});
        if(!task) throw { status: 404, message: `No task found for task id ${taskid}` };
        res.status(200).send({task});
})

const deleteTask = errorWrapper(async (req,res)=>{
    const {id:taskid} = req.params;
        const task = await Task.findByIdAndDelete(taskid);
        if(!task) throw { status: 404, message: `No task found for task id ${taskid}` };
        res.status(200).send({status:'success',message:`${taskid} Deleted success fully`});
})

module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}
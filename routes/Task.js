const express = require('express');
const router = express.Router();
const {getAllTasks,getSingleTask,createTask,updateTask,deleteTask} = require('../controllers/Task');

router.get('/',getAllTasks);
router.get('/:id',getSingleTask);
router.post('/',createTask);
router.delete('/:id',deleteTask);
router.patch('/:id',updateTask);

module.exports = router
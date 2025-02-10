const express = require('express');
const router = express.Router();
const {createJob,getAllJob,getSingleJob,updateJob,deleteJob} = require('../controllers/Job');

router.route('/').post(createJob).get(getAllJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = router;
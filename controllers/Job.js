const Job = require("../models/Job");
const errorWrapper = require("../utils/errorWrapper");
const getQueryDetails = require('../utils/queryParser');

const createJob = errorWrapper(async (req, res) => {
  const job = req.body;
  job.createdBy = req.user._id;
  const newJob = await Job.create(job);
  res.status(201).json({ job: newJob });
});

const getAllJob = errorWrapper(async (req, res) => {

    const {sortParams,page,limit,select,filters} = getQueryDetails(req.query);
     filters.createdBy = req.user._id;
     sortParams.createdAt = 1;
    const Jobs = await Job.find(filters).sort(sortParams).select(select).skip(page).limit(limit);
      if (Jobs.length < 1)
    throw {
      status: 404,
      message: `No jobs found for the user  ${req.user.userName}`,
    };
  res.status(200).json({ count: Jobs.length, Jobs });
});

const getSingleJob = errorWrapper(async (req, res) => {
  const _id = req.params.id;
  const createdBy = req.user._id;
  const job = await Job.findOne({ _id, createdBy });
  if (!job) throw { status: 404, message: `No job found for the id ${_id}` };
  res.status(200).json({ job });
});

const updateJob = errorWrapper(async (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  const job = await Job.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
  if (!job) throw { status: 404, message: `No job found for the id ${_id}` };
  res.status(200).json({ job });
});

const deleteJob = errorWrapper(async (req, res) => {
  const _id = req.params.id;
  const job = await Job.findByIdAndDelete(_id);
  if (!job) throw { status: 404, message: `No job found for the id ${_id}` };
  res.status(200).json();
});

module.exports = {
    createJob,
    getSingleJob,
    getAllJob,
    updateJob,
    deleteJob
}
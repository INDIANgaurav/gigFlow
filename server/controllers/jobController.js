const JobPosting = require("../models/JobPosting");

// POST: Create a new job
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user._id, // assuming you're using auth middleware
    };

    const newJob = new JobPosting(jobData);
    await newJob.save();
    res
      .status(201)
      .json({ success: true, message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error("Job creation error:", err);
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to create job",
        error: err.message,
      });
  }
};

// GET: All job listings
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find().populate("postedBy", "name email"); // optional populate
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// GET: Job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};

// GET: Jobs by logged-in HR
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find({ postedBy: req.user._id });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch your jobs" });
  }
};

// PUT: Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to update this job" });
    }

    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Job updated", job: updatedJob });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
};

// DELETE: Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this job" });
    }

    await JobPosting.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};

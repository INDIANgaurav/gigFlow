const mongoose = require("mongoose");
const { Schema } = mongoose;
const jobPostingSchema = new Schema({
  role: { type: String, required: true },
  skillsRequired: {
    type: [String],
    required: true,
  },
  experienceLevel: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    required: true,
  },

  workplaceType: {
    type: String,
    enum: ["Remote", "In-office", "Hybrid"],
    required: true,
  },
  stipend: { type: String, required: true },
  openings: { type: Number, required: true },
  description: { type: String, required: true },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postedAt: { type: Date, default: Date.now },
});

const JobPosting = mongoose.model("jobPosting", jobPostingSchema);
module.exports = JobPosting;

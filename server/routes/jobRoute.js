const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { userMiddleware } = require("../middleware/userMiddleware");
 
router.post("/createJob", userMiddleware, jobController.createJob);
 
router.get("/getAllJobs", jobController.getAllJobs);
 
router.get("/getJobById/:id", jobController.getJobById);
 
router.get("/getMyJobs", userMiddleware, jobController.getMyJobs);
 
router.put("/updateJob/:id", userMiddleware, jobController.updateJob);
 
router.delete("/deleteJob/:id", userMiddleware, jobController.deleteJob);

module.exports = router;

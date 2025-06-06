const express = require("express");
const router = express.Router();

const { userMiddleware } = require("../middleware/userMiddleware");
const {
  addNewMember,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeData,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/addNewMember", userMiddleware, addNewMember);

router.get("/getAllEmployees", getAllEmployees);

router.get("/getEmployeeById/:id", getEmployeeById);

router.put("/updateEmployeeData/:id", userMiddleware, updateEmployeeData);

router.delete("/deleteEmployee/:id", userMiddleware, deleteEmployee);

module.exports = router;

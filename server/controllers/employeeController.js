const Employee = require("../models/Employee");

exports.addNewMember = async (req, res) => {
  const { employeeName, jobTitle, department, netSalary, salaryStatus } = req.body;

  try {
    const newEmployee = new Employee({
      employeeName,
      jobTitle,
      department,
      netSalary,
      salaryStatus,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "New Employee Added successfully",
      employee: newEmployee,
    });
  } catch (err) {
    console.error("Employee Creation error:", err);
    res.status(400).json({
      success: false,
      message: "Failed to create Employee",
      error: err.message,
    });
  }
};
 
// GET: All employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, employees });
  } catch (err) {
    console.error("getAllEmployees error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch employees", error: err.message });
  }
};

// GET: Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, employee });
  } catch (err) {
    console.error("getEmployeeById error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch employee", error: err.message });
  }
};

// PUT: Update employee
exports.updateEmployeeData = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee updated successfully", employee: updated });
  } catch (err) {
    console.error("updateEmployeeData error:", err);
    res.status(500).json({ success: false, message: "Failed to update employee", error: err.message });
  }
};

// DELETE: Remove employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    console.error("deleteEmployee error:", err);
    res.status(500).json({ success: false, message: "Failed to delete employee", error: err.message });
  }
};
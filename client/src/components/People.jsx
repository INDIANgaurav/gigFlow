import React, { useEffect, useState } from "react";
import axios from "axios";

const People = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeName: "",
    jobTitle: "",
    department: "",
    netSalary: "",
    salaryStatus: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4040/api/v1/employee/getAllEmployees", {
        withCredentials: true,
      });
      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      console.error("Error fetching employees:", err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4040/api/v1/employee/addNewMember", form, {
        withCredentials: true,
      });

      if (res.data.success) {
        setForm({
          employeeName: "",
          jobTitle: "",
          department: "",
          netSalary: "",
          salaryStatus: "",
        });
        fetchEmployees();
      }
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/api/v1/employee/deleteEmployee/${id}`, {
        withCredentials: true,
      });
      fetchEmployees();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const startEditing = (emp) => {
    setForm({
      employeeName: emp.employeeName,
      jobTitle: emp.jobTitle,
      department: emp.department,
      netSalary: emp.netSalary,
      salaryStatus: emp.salaryStatus,
    });
    setEditingId(emp._id);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4040/api/v1/employee/updateEmployeeData/${editingId}`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        setForm({
          employeeName: "",
          jobTitle: "",
          department: "",
          netSalary: "",
          salaryStatus: "",
        });
        setEditingId(null);
        fetchEmployees();
      }
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const cancelEditing = () => {
    setForm({
      employeeName: "",
      jobTitle: "",
      department: "",
      netSalary: "",
      salaryStatus: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="text-2xl font-bold mb-4 text-center md:text-left">{editingId ? "Edit Employee" : "List of People"}</p>

        <form
          onSubmit={editingId ? updateEmployee : addEmployee}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded shadow"
        >
          {["employeeName", "jobTitle", "department", "netSalary", "salaryStatus"].map((field) =>
            field === "salaryStatus" ? (
              <select
                key={field}
                name="salaryStatus"
                value={form.salaryStatus}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            ) : (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 border rounded"
                required
              />
            )
          )}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="col-span-1 sm:col-span-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Table Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px] grid grid-cols-6 gap-4 border rounded-lg p-4 bg-gray-50 font-semibold text-center text-sm md:text-base">
          <div>Name</div>
          <div>Job Title</div>
          <div>Department</div>
          <div>Salary</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {employees.map((emp) => (
          <div
            key={emp._id}
            className="min-w-[600px] grid grid-cols-6 gap-4 border-b py-3 items-center text-sm md:text-base text-center"
          >
            <div>{emp.employeeName}</div>
            <div>{emp.jobTitle}</div>
            <div>{emp.department}</div>
            <div>₹{emp.netSalary}</div>
            <div>{emp.salaryStatus}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => startEditing(emp)}
                className="text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                aria-label={`Edit ${emp.employeeName}`}
              >
                Edit
              </button>
              <button
                onClick={() => deleteEmployee(emp._id)}
                className="text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                aria-label={`Delete ${emp.employeeName}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;

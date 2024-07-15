import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeePage.css";

const EmployeePage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [employee, setEmployee] = useState(null);
  const [user, setUser] = useState(null);
  const [directReports, setDirectReports] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    axios
      .get(`http://localhost:5000/api/employees/${employeeId}`)
      .then((response) => {
        setEmployee(response.data);
        if (
          ["Manager", "HR", "CEO", "CFO", "COO", "CSO"].includes(
            loggedInUser.role
          )
        ) {
          // Fetch direct reports if the user is a manager, HR, or executive roles
          axios
            .get(
              `http://localhost:5000/api/employees?manager_id=${response.data.employee_id}`
            )
            .then((res) => {
              setDirectReports(res.data);
            })
            .catch((error) =>
              console.error("Error fetching direct reports:", error)
            );
        }
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [employeeId]);

  if (!employee || !user) {
    return <div>Loading...</div>;
  }

  const canViewSalary =
    user?.role === "HR" ||
    ["CEO", "CFO", "COO", "CSO"].includes(user?.role) ||
    user?.employee_id == employee.employee_id || // Allow logged-in user to view their own salary
    (user?.role === "Manager" && employee.manager_id == user.employee_id);

  console.log("Logged in user:", user);
  console.log("Viewing employee:", employee);
  console.log("User role:", user.role);
  console.log("Employee ID:", employee.employee_id);
  console.log("Viewing Employee ID:", employee.employee_id);
  console.log("Employee Manager ID:", employee.manager_id);
  console.log("Can view salary:", canViewSalary);

  return (
    <div className="employee-page">
      <button className="back-button" onClick={() => navigate("/DirectoryPage")}>
        Back to Directory
      </button>
      <div className="employee-header">
        <div className="employee-avatar">{/* Placeholder for avatar */}</div>
        <div className="employee-info">
          <h2>
            {employee.name} -{" "}
            <span className="employee-show">{employee.show}</span>
          </h2>
          <p>{employee.role}</p>
          <p>{employee.city}</p>
        </div>
      </div>
      <div className="employee-details">
        <div className="detail-section">
          <h3>Contact</h3>
          <p>Phone: {employee.phone}</p>
        </div>
        <div className="detail-section">
          <h3>Job</h3>
          <p>Role: {employee.role}</p>
          <p>Location: {employee.city}</p>
        </div>
        {canViewSalary && (
          <div className="detail-section">
            <h3>Salary</h3>
            <p>Salary: ${employee.salary}</p>
          </div>
        )}
        {directReports.length > 0 && (
          <div className="detail-section">
            <h3>Direct Reports</h3>
            {directReports.map((report) => (
              <div key={report.employee_id}>
                <p>
                  {report.name} - {report.role}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePage;

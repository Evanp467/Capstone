import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    axios.get("/api/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const filteredEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((employee) =>
      filterRole ? employee.jobRole === filterRole : true
    );

  return (
    <div>
      <h2>Employee Directory</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
      >
        <option value="">Filter by role</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
        <option value="HR">HR</option>
      </select>
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee._id}>
            <Link to={`/employee/${employee._id}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

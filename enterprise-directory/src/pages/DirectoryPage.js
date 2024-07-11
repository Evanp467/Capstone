import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DirectoryPage.css";

const DirectoryPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch employees from the backend
    axios
      .get("/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-page">
      <aside className="sidebar">
        <h2>Filters</h2>
        <div className="filter">
          <label>Division</label>
          <select>
            <option value="">All Divisions</option>
            {/* Populate options dynamically */}
          </select>
        </div>
        <div className="filter">
          <label>Department</label>
          <select>
            <option value="">All Departments</option>
            {/* Populate options dynamically */}
          </select>
        </div>
        <div className="filter">
          <label>Location</label>
          <select>
            <option value="">All Locations</option>
            {/* Populate options dynamically */}
          </select>
        </div>
        <div className="filter">
          <label>Badges</label>
          <select>
            <option value="">All Badges</option>
            {/* Populate options dynamically */}
          </select>
        </div>
      </aside>
      <main className="main-content">
        <div className="header">
          <h1 className="directory-title">People Directory</h1>
          <input
            type="text"
            placeholder="Start typing..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <img
                src={employee.photo}
                alt={employee.name}
                className="employee-photo"
              />
              <h2 className="employee-name">{employee.name}</h2>
              <p className="employee-role">{employee.jobRole}</p>
              <p className="employee-location">{employee.workLocation}</p>
              <p className="employee-email">{employee.email}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DirectoryPage;

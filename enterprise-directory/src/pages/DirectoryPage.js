import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomDropdown from "../components/CustomDropdown";
import ProfileMenu from "../components/ProfileMenu"; // Import ProfileMenu
import "./DirectoryPage.css";

const roles = ["CEO", "CFO", "COO", "CSO", "HR", "Manager", "Employee"];
const locations = [
  "Hartford",
  "New York City",
  "Boston",
  "Albany",
  "Bridgeport",
  "DC",
  "Baltimore",
  "Providence",
  "Springfield",
  "Chicago",
  "Dallas",
  "Houston",
  "Miami",
  "San Diego",
  "Los Angeles",
  "Kansas City",
  "Forest Hill",
  "Torrington",
  "Hunt Valley",
  "Keene",
];
const shows = [
  "Squid games",
  "Stranger things",
  "Wednesday",
  "Money heist",
  "Queens gambit",
  "Lucifer",
  "Witcher",
  "Trailer Park Boys",
  "Don't Look Up",
  "BirdBox",
  "Ozark",
  "Bojack Horseman",
  "You",
  "Suits",
  "Dexter",
  "House of Cards",
  "Alone",
  "The Last Kingdom",
  "Sandman",
  "Supernatural",
  "Outer Banks",
];

const DirectoryPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedShows, setSelectedShows] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        console.log("Fetched employees:", response.data);
        const employeesWithRoles = response.data.map((employee) => {
          if (!roles.includes(employee.role)) {
            return { ...employee, role: "Employee" };
          }
          return employee;
        });
        setEmployees(employeesWithRoles);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(role)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.includes(location)
        ? prevSelectedLocations.filter((l) => l !== location)
        : [...prevSelectedLocations, location]
    );
  };

  const handleShowChange = (show) => {
    setSelectedShows((prevSelectedShows) =>
      prevSelectedShows.includes(show)
        ? prevSelectedShows.filter((s) => s !== show)
        : [...prevSelectedShows, show]
    );
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRoles.length === 0 || selectedRoles.includes(employee.role)) &&
      (selectedLocations.length === 0 ||
        selectedLocations.includes(employee.city)) &&
      (selectedShows.length === 0 || selectedShows.includes(employee.show))
  );

  return (
    <div className="directory-page">
      <aside className="sidebar">
        <ProfileMenu /> {/* Include the ProfileMenu above filters */}
        <h2>Filters</h2>
        <div className="filter">
          <CustomDropdown
            title="All Roles"
            options={roles}
            selectedOptions={selectedRoles}
            onOptionChange={handleRoleChange}
          />
        </div>
        <div className="filter">
          <CustomDropdown
            title="All Locations"
            options={locations}
            selectedOptions={selectedLocations}
            onOptionChange={handleLocationChange}
          />
        </div>
        <div className="filter">
          <CustomDropdown
            title="All Shows"
            options={shows}
            selectedOptions={selectedShows}
            onOptionChange={handleShowChange}
          />
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
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div key={employee.employee_id} className="employee-card">
                <h2 className="employee-name">{employee.name}</h2>
                <p className="employee-show">Show: {employee.show}</p>
                <p className="employee-role">{employee.role}</p>
                <p className="employee-location">{employee.city}</p>
              </div>
            ))
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DirectoryPage;

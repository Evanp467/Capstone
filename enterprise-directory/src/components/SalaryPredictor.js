import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalaryPredictor.css"; // Import the CSS file

const jobRoles = [
  "HR",
  "Manager",
  "Cybersecurity",
  "Data Engineer",
  "Marketing",
  "Public Relations",
  "Sales",
  "Software Dev",
];

const cities = [
  "Albany",
  "Boston",
  "Forest Hill",
  "Hartford",
  "Hunt Valley",
  "New York City",
  "Torrington",
];

const SalaryPredictor = () => {
  const [jobRole, setJobRole] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [predictedSalary, setPredictedSalary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add the salary-predictor class to the body
    document.body.classList.add("salary-predictor");

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("salary-predictor");
    };
  }, []);

  const handlePredict = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/predict-salary",
        {
          role: jobRole,
          city: workLocation,
        }
      );

      setPredictedSalary(response.data.salary);
    } catch (error) {
      console.error("Error predicting salary:", error);
      setPredictedSalary("Error predicting salary");
    }
  };

  return (
    <div className="salary-predictor-container">
      <h3 className="title">Salary Predictor</h3>
      <div className="form-group">
        <select
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Job Role</option>
          {jobRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <select
          value={workLocation}
          onChange={(e) => setWorkLocation(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Work Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handlePredict} className="predict-button">
        Predict Salary
      </button>
      {predictedSalary && (
        <div className="predicted-salary">
          Predicted Salary: {predictedSalary}
        </div>
      )}
      <button
        onClick={() => navigate("/DirectoryPage")}
        className="back-button"
      >
        Back to Directory
      </button>
    </div>
  );
};

export default SalaryPredictor;

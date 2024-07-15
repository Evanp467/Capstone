import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h3>Salary Predictor</h3>
      <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
        <option value="">Select Job Role</option>
        {jobRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <select
        value={workLocation}
        onChange={(e) => setWorkLocation(e.target.value)}
      >
        <option value="">Select Work Location</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button onClick={handlePredict}>Predict Salary</button>
      {predictedSalary && <div>Predicted Salary: {predictedSalary}</div>}
      <button onClick={() => navigate("/DirectoryPage")}>
        Back to Directory
      </button>
    </div>
  );
};

export default SalaryPredictor;

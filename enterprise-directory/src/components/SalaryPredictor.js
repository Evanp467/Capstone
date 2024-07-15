import React, { useState } from "react";
import axios from "axios";

const jobRoles = ["Employee", "HR", "Manager"];

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
    </div>
  );
};

export default SalaryPredictor;

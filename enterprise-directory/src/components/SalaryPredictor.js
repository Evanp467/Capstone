import React, { useState } from "react";
import axios from "axios";

const SalaryPredictor = () => {
  const [jobRole, setJobRole] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handlePredict = async () => {
    const response = await axios.post("/api/predict-salary", {
      jobRole,
      workLocation,
    });
    setPredictedSalary(response.data.salary);
  };

  return (
    <div>
      <h3>Salary Predictor</h3>
      <input
        type="text"
        placeholder="Job Role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Work Location"
        value={workLocation}
        onChange={(e) => setWorkLocation(e.target.value)}
      />
      <button onClick={handlePredict}>Predict Salary</button>
      {predictedSalary && <div>Predicted Salary: {predictedSalary}</div>}
    </div>
  );
};

export default SalaryPredictor;

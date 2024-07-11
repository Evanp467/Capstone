import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [salary, setSalary] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`/api/employee/${id}`).then((response) => {
      setEmployee(response.data);
    });
  }, [id]);

  const handleViewSalary = () => {
    axios
      .get(`/api/employee/${id}/salary`, {
        headers: { "user-id": user.username },
      })
      .then((response) => {
        setSalary(response.data.salary);
      });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Phone: {employee.phone}</p>
      <p>Job Role: {employee.jobRole}</p>
      <p>Work Location: {employee.workLocation}</p>
      <button onClick={handleViewSalary}>View Salary</button>
      {salary && <p>Salary: {salary}</p>}
    </div>
  );
};

export default EmployeeDetail;

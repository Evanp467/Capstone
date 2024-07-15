import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectoryPage from "./pages/DirectoryPage";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import SalaryPredictor from "./components/SalaryPredictor"; // Ensure correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/DirectoryPage" element={<DirectoryPage />} />
        <Route path="/employee/:employeeId" element={<EmployeePage />} />
        <Route path="/SalaryPredictor" element={<SalaryPredictor />} />{" "}
        {/* Update path */}
      </Routes>
    </Router>
  );
}

export default App;

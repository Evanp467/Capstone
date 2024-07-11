import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DirectoryPage from "./pages/DirectoryPage";
import EmployeePage from "./pages/EmployeePage";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/directory"
          element={
            isAuthenticated ? <DirectoryPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/employee/:id"
          element={
            isAuthenticated ? <EmployeePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/directory" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;

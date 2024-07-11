import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login - in real scenario, authenticate with backend
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/directory");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome to Enterprise Directory</h2>
        <p className="login-subtitle">Please log in to continue</p>
        <input
          type="text"
          placeholder="User ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

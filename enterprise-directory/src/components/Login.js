import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        employee_id: username,
        password,
      });
      console.log("Login response:", response.data);
      if (response.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: response.data.name, employee_id: username })
        );
        navigate("/DirectoryPage");
      } else {
        setError("Wrong username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Wrong username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome to Enterprise Directory</h2>
        <p className="login-subtitle">Please log in to continue</p>
        {error && <p className="error-message">{error}</p>}
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

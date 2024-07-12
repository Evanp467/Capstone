import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css"; // Import the CSS file for styling

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleViewProfile = () => {
    navigate("/EmployeePage");
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-menu">
      <div className="profile-circle" onClick={handleMenuToggle}></div>
      {menuOpen && (
        <div className="dropdown-menu">
          <p className="user-name">{user?.name}</p>{" "}
          {/* Display character name */}
          <button onClick={handleViewProfile}>View Profile</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

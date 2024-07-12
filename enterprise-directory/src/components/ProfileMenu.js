import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleViewProfile = () => navigate(`/employee/${user.employee_id}`);
  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-menu">
      <div className="profile-circle" onClick={toggleDropdown}></div>
      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="user-name">{user.name}</div>
          <button onClick={handleViewProfile}>View Profile</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

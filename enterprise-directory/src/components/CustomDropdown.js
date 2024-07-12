import React, { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="custom-dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {title}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div key={option} className="checkbox-item">
              <input
                type="checkbox"
                id={option}
                name={option}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => onOptionChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.defaultProps = {
  title: "Select Options",
};

export default CustomDropdown;

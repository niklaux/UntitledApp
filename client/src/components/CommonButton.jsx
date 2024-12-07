import React from "react";
import PropTypes from "prop-types";
import "../stylings/CommonButton.css"; // Optional: Add a CSS file for consistent styles

function CommonButton({
  label,
  onClick = () => {}, // Default to no-op
  type = "button", // Default to "button"
  disabled = false, // Default to enabled
  className = "", // Default to no extra classes
}) {
  return (
    <button
      className={`common-button ${className}`} // Allows custom styling via className
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

CommonButton.propTypes = {
  label: PropTypes.string.isRequired, // Button label
  onClick: PropTypes.func, // Function to call on click
  type: PropTypes.oneOf(["button", "submit", "reset"]), // HTML button types
  disabled: PropTypes.bool, // Disable the button
  className: PropTypes.string, // Custom class for additional styling
};

export default CommonButton;

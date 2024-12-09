import React from "react";
import PropTypes from "prop-types";
import "../stylings/CommonButton.css"; // Optional: Add a CSS file for consistent styles

function CommonButton({
  label,
  onClick = () => {}, // Default to no-op
  type = "button", // Default to "button"
  disabled = false, // Default to enabled
  className = "", // Default to no extra classes
  backgroundColor, // Prop for background color
  textColor, // New prop for text color
}) {
  return (
    <button
      className={`border common-button ${className}`} // Allows custom styling via className
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor || undefined, // Apply background color if provided
        color: textColor || undefined, // Apply text color if provided
      }}
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
  backgroundColor: PropTypes.string, // Custom background color for the button
  textColor: PropTypes.string, // Custom text color for the button
};

export default CommonButton;

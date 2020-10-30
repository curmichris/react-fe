import React from "react";
import PropTypes from "prop-types";

const CheckBox = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="form-check-label">{label}</label>
    </div>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default CheckBox;

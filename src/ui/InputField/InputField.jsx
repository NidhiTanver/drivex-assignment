import React from "react";
import "./styles.scss";

const InputField = ({ data, action }) => {
  const { name, hasError, value, field, error, type } = data;
  return (
    <div className="form-group user-form">
      <label>{field}:</label>
      <input
        type={type}
        className={`form-control ${hasError && hasError}`}
        name={name}
        onChange={(event) => action(event)}
        placeholder={`Enter ${field}`}
        value={value}
        required
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;

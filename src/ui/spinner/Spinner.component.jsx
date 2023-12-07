import React from "react";
import "./styles.scss";
const Spinner = () => {
  return (
    <div className="container">
      <div className="spinner">
        <div className="spinner-grow" role="status"></div>
      </div>
    </div>
  );
};

export default Spinner;

import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const userData = JSON.parse(localStorage.getItem("drivex-user-data"));

  const navigate = useNavigate();
  return (
    <div className="container app-header">
      <div className="row header-wrapper">
        <div className="col-md-8 title">
          <h5>Welcome: {userData?.firstname}</h5>
        </div>
        <div className="col-md-4 profile">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/profile")}
          >
            Manage profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

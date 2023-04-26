import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDataListing from "./UserDatalisting";
import './SignUp.css';

const DashboardCustomer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <UserDataListing/>
        <div className="Add_icon">
        <Link to="/Usersignuppage">
          {" "}
          <i className="fas fa-plus" title="Add users"></i>
        </Link>
        </div>
       
      </div>
    </div>
  );
};

export default DashboardCustomer;

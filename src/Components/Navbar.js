import React, { useState } from "react";
import "../App.css";
import FormManagement from "./FormManagement/FormManagement";
import UserManagement from "./UserManagement/UserManagement";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormManagementPageOpen, setIsFormManagementPageOpen] =
    useState(true);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDashboardFormContent = () => {
    setIsFormManagementPageOpen(true);
  };

  const handleDashboardUserContent = () => {
    setIsFormManagementPageOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="https://media.licdn.com/dms/image/C510BAQFwIQPqBkZaFg/company-logo_200_200/0/1528443245244?e=1689206400&v=beta&t=LnY-5TzFgglFXSkkmdFSX80Mjkx920IRPCn_u0L1uR4"
            alt=""
            width="35"
            height="35"
            className="d-inline-block align-text-top"
          />
          KIWITECH FORM MANAGEMENT
        </div>
        <div className="navbar-bell-icon">
          <i class="fas fa-bell" title="notification"></i>
        </div>
        <div className="navbar-profile">
          <i className="fas fa-user" title="profile"></i>
        </div>
        <div className="navbar-hamburger" onClick={handleHamburgerClick}>
          <div className="navbar-hamburger-icon"></div>
        </div>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li
            className={`sidebar-item ${
              isFormManagementPageOpen ? "active" : ""
            }`}
            onClick={() => handleDashboardFormContent()}
          >
            FORM MANAGEMENT
          </li>
          <li
            className={`sidebar-item ${
              !isFormManagementPageOpen ? "active" : ""
            }`}
            onClick={() => handleDashboardUserContent()}
          >
            USER MANAGEMENT
          </li>
        </ul>
      </div>
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        {isFormManagementPageOpen ? <FormManagement /> : <UserManagement />}
      </div>
    </div>
  );
};

export default Navbar;

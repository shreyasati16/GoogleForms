import React, { useState } from "react";
import Heading from "./Heading";
import SignUp from "./SignUp";
import "./SignUp.css";

const Usersignuppage = ({ handleLoading }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handleHamburgerClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
            <Heading />
            <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
                <SignUp handleLoading={handleLoading} />
            </div>
        </div>
    );
};

export default Usersignuppage;

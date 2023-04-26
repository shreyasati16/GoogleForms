import React, { useEffect, useState } from "react";
import { formListing_getData } from "../../Services/Services";
import MyForms from "./MyForms";
import "./FormManagement.css";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";

const FormManagement = () => {
  const [myFormDetails, setMyFormDetails] = useState([]);

  // This is to get forms data from form API
  const getAllFormsData = () => {
    formListing_getData().then((response) => {
      setMyFormDetails(response.data);
    });
  };

  // useEffect(()=>{
  //   getAllFormsData();
  // })

  return (
    <div>
      <Link to="/addForms">
        <button className="add-icon-icon">Add Forms</button>
      </Link>
      {/* {
        myFormDetails.length > 0 ? <MyForms/> : <p className="no-forms_text">No Forms Found</p>
      } */}

      <Dashboard />
    </div>
  );
};

export default FormManagement;

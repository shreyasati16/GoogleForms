import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "../Constants/Constants";
import "../App.css";
// import { Link } from "react-router-dom";

const PreviewForms = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch form data
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "237",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API}/survey/form/`,
          config
        );

        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchData();
  }, []);

  if (formData === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="preview-container">
      <h1 className="preview-heading">Form</h1>
      <div className="card-container">
        {/* Render data from multiple arrays in card format */}
        {formData.map((data, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">{data.name}</h2>
            <p className="card-description">{data.description}</p>
            <p className="card-max-marks">Max Marks: {data.max_marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewForms;

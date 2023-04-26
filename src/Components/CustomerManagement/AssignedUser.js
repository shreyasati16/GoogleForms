import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { accessToken } from "../../Constants/Constants";
import './SignUp.css';

const AssignedUser = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    // Fetch Form Data
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
          `${process.env.REACT_APP_API}/account/logged-in-users/`,
          config
        );

        setFormData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchData();
  }, []);

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formData.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(formData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to handle page click
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className={isOpen ? "modal modal-open" : "modal"} style={{ zIndex: 99 }}>
      <div className="modal-content">
      <p onClick={onClose} className="close-button">X
          </p>
        <h2>LOGGED-IN USERS </h2>
       
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{data.first_name} {data.last_name}</td>
                <td>{data.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              id={number}
              onClick={handleClick}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
        
      <button >Assign</button>
      </div>
    </div>
  );
};

export default AssignedUser;

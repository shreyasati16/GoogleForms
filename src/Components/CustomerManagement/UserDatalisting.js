import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  accessToken,
  pagination_current_page,
  pagination_item_per_page,
} from "../../Constants/Constants";
import "../../App.css";

const UserDataListing = () => {
  const [formData, setFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState(pagination_current_page);
  const [itemsPerPage, setItemsPerPage] = useState(pagination_item_per_page);
  const [searchTerm, setSearchTerm] = useState("");

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
          `${process.env.REACT_APP_API}/account/signup/`,
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

  const onDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "237",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        await axios.delete(
          `${process.env.REACT_APP_API}/account/signup/${userId}/`,
          config
        );
        // Update the state to reflect the deleted user
        setFormData(formData.filter((user) => user.id !== userId));
      } catch (error) {
        console.error(`Failed to delete user with ID ${userId}`, error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (formData === null) {
    return <p>Loading...</p>;
  }

  // Calculate pagination logic for form data

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(formData.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="preview-container">
      <h1 className="preview-heading">USERS</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search.."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                Name <i className="fas fa-sort" />
              </th>
              <th>Email</th>
              <th>Contact</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render data from multiple arrays in table rows */}
            {currentItems.map((data, index) => (
              <tr key={index}>
                <td>
                  {data.first_name} {data.last_name}
                </td>
                <td>{data.email}</td>
                <td>{data.contact}</td>
                <td>{moment(data.created_at).format(" DD/MM/YYYY")}</td>
                <td>
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => onDeleteUser(data.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Render pagination buttons */}
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`pagination-button ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDataListing;

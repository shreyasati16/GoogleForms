import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  accessToken,
  pagination_current_page,
  pagination_item_per_page,
} from "../Constants/Constants";
import "../App.css";
import moment from "moment";
import AssignedUser from "./CustomerManagement/AssignedUser";

const DataListing = () => {
  const [formData, setFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState(pagination_current_page);
  const [itemsPerPage, setItemsPerPage] = useState(pagination_item_per_page);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(formData);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        setFilteredData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (formData === null) {
    return <p>Loading...</p>;
  }
  if (filteredData === null) {
    return <p>Searching...</p>;
  }

  // Calculate pagination logic for form data

  let currentItems = [];
  let totalPages = 0;
  if (Array.isArray(filteredData)) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
  }

  // Create an array of page numbers for the pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="preview-container">
      <h1 className="preview-heading">FORMS</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search.."
          value={searchTerm}
          onChange={async (event) => {
            setSearchTerm(event.target.value);
            try {
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "237",
                  Authorization: `Bearer ${accessToken}`,
                },
              };
              const response = await axios.get(
                `${process.env.REACT_APP_API}/survey/form/?search=${event.target.value}`,
                config
              );
              setFilteredData(response.data);
              console.log(response);
              setCurrentPage(1); // reset pagination to first page
            } catch (error) {
              console.error("Failed to fetch search results", error);
            }
          }}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                Name <i className="fas fa-sort" />
              </th>
              <th>Description</th>
              <th>Created At</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              // Render data from multiple arrays in table rows
              currentItems.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{moment(data.created_at).format(" DD/MM/YYYY")}</td>
                  <td>
                    <p onClick={() => setIsModalOpen(true)}>
                      <i class="fas fa-user-plus" title="Assign"></i>
                    </p>
                  </td>
                  <td>
                    <p>
                      <i class="far fa-file-alt" title="Draft"></i>
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <AssignedUser
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}

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

export default DataListing;

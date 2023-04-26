import React ,{useState} from "react";
import "../App.css";
import DataListing from "./DataListing";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <center>
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <DataListing/>
      </div>
    </center>
  );
};

export default Dashboard;

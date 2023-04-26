import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/SuperAdminLogin/Login";
import Navbar from "./Components/Navbar";
import AddForms from "./Components/FormManagement/AddForms";
import PreviewForms from "./Components/PreviewForms";
import FormManagement from "./Components/FormManagement/FormManagement";
import UserManagement from "./Components/UserManagement/UserManagement";
import Usersignuppage from "./Components/CustomerManagement/Usersignuppage";
import Loader from "./Components/Loader";

const App = () => {
    const [loading, setLoading] = React.useState(false);
    const handleLoading = () => {
        setLoading((prev) => !prev);
    };
    return (
        <>
            {loading && <Loader />}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Navbar />}></Route>
                    <Route
                        path="/formManagement"
                        element={<FormManagement />}
                    ></Route>
                    <Route path="/addForms" element={<AddForms />}></Route>
                    <Route
                        path="/userManagement"
                        element={<UserManagement />}
                    ></Route>
                    <Route path="/PreviewForm" element={<PreviewForms />} />
                    <Route
                        path="/usersignuppage"
                        element={
                            <Usersignuppage handleLoading={handleLoading} />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

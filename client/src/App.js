import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" Component={Login} />
                    <Route path="/register" Component={Register} />
                    <Route path="/dashboard" Component={Dashboard} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

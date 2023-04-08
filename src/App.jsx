import axios from "axios";
import React, { useContext, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { api } from "./config";
import { Context } from "./main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
    const { isAuthenticated, setIsAuthenticated, setUser,loading, setLoading } =
        useContext(Context);
    useEffect(() => {
        getUserProfile();
    }, []);
    const getUserProfile = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(api.prefix + api.profile, {
                withCredentials: true,
            });
            setUser(data.user);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            setUser({});
            setIsAuthenticated(false);
            setLoading(false);
        }
    };
    return (
        <BrowserRouter>
            {isAuthenticated && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

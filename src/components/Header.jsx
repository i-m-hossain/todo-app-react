import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { api } from "../config";
import { Context } from "../main";
const Header = () => {
    const {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        setUser,
    } = useContext(Context);
    const handleLogout = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(api.prefix + api.logout, {
                withCredentials: true,
            });
            setIsAuthenticated(false);
            toast.success(data.message);
            setLoading(false);
            setUser({});
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };
    return (
        <nav className="header">
            <div>
                <h2>Todo App</h2>
            </div>
            <article>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                {!isAuthenticated ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <button
                        className="btn"
                        disabled={loading}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </article>
        </nav>
    );
};

export default Header;

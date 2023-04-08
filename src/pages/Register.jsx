import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { api } from "../config";
import { Context } from "../main";

const Register = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
        useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(
                api.prefix + api.register,
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };
    if (isAuthenticated) return <Navigate to={"/"} />;
    return (
        <div className="login" onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Sign up </h2>
            <section>
                <form action="" className="">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        Register
                    </button>
                    <h4>or</h4>
                    <Link to="/login">Login</Link>
                </form>
            </section>
        </div>
    );
};

export default Register;

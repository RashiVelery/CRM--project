import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            
        }
        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        // display username 
        if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        navigate("/dashboard");
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="btn btn-primary">Login</button>
                <p className="mt-3">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    const [userRegistration, setUserRegistration] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = JSON.stringify(userRegistration);

        const response = await fetch("/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("token", token);
            navigate("/admin/list");
        } else {
            console.error("Login failed");
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        autoComplete="off"
                        value={userRegistration.username}
                        onChange={handleInput}
                        name="username"
                        id="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        autoComplete="off"
                        value={userRegistration.password}
                        onChange={handleInput}
                        name="password"
                        id="password"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default Login;

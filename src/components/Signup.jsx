import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Signup.css'

const Signup = () => {
    const [userRegistration, setUserRegistration] = useState({
        username: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Jsondata=JSON.stringify(userRegistration);

        console.log("Singup Data",Jsondata);

        const response = await fetch("/api/register/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: Jsondata
        });

        if (response.ok) {
            navigate("/login");
        } else {
            console.error("Registration failed");
        }
    }

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form action="POST" className="signup-form" onSubmit={handleSubmit}>
                <div>
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
                <div>
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
                <div>
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        autoComplete="off"
                        value={userRegistration.role}
                        onChange={handleInput}
                        name="role"
                        id="role"
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Signup;
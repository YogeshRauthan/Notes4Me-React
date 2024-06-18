import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");

        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                if (json.success) {
                    if (json.authToken) {
                        localStorage.setItem("token", json.authToken);
                        navigate("/");
                        props.showAlert("Logged in Successfully", "success");
                    } else {
                        props.showAlert("Error: No token received", "danger");
                    }
                } else {
                    props.showAlert("Invalid Credentials", "danger");
                }
            } else {
                props.showAlert(`Error: ${response.statusText}`, "danger");
            }
        } catch (error) {
            props.showAlert("Error: Unable to log in", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className='m-2'>
            <h2>Login to continue to Your Notes</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    onChange={onChange}
                    value={credentials.email}
                    name='email'
                    id="email"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type='password'
                    className="form-control"
                    onChange={onChange}
                    value={credentials.password}
                    name='password'
                    id="password"
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
};

export default Login;

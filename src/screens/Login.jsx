import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const nevigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:5000/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await responce.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid cridentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      nevigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Login
          </button>
          <Link to="/signUp" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;

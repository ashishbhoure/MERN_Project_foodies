import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const nevigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:5000/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.location,
        password: credentials.password,
      }),
    });
    const json = await responce.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid cridentials");
    }
    nevigate("/login");
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Location"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
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
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Allready a user
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;

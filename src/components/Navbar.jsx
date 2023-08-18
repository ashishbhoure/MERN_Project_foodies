import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReduser";

function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fst-italic fw-600" to="/">
          Foodies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link fs-5 fw-bold"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 fw-bold"
                  aria-current="page"
                  to="/myOrder"
                >
                  My Order
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-info m-1 fw-bold" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-info m-1 fw-bold" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-info m-1 fw-bold"
                onClick={() => setCartView(true)}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length === 0 ? "" : data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}
              <div
                className="btn bg-white text-danger m-1 fw-bold"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

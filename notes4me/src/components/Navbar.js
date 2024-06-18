import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

  let navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Notes4Me
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } 
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          {localStorage.getItem('token') ? <button onClick={handleLogout} className="btn btn-primary">Logout</button> : <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="submit">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="submit">Signup</Link>
          </form>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

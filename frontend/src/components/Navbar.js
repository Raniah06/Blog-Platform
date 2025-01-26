import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Blog Platform</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.username}</span>
              <button className="btn btn-logout" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-login" to="/login">Login</Link>
              <Link className="btn btn-register" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

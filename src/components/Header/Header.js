import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Book Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            <NavLink
              className={"nav-link  px-3 mx-2"}
              aria-current="page"
              to="/home"
            >
              Home
            </NavLink>
            <NavLink className={"nav-link px-3 mx-2"} to="/add-book">
              Add Book
            </NavLink>

            {user?.role === "admin" && (
              <NavLink className={"nav-link px-3 mx-2"} to="/make-admin">
                Make Admin
              </NavLink>
            )}

            {user?.email ? (
              <>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
                <span className="text-white mt-2 ms-3">
                  Logged in as {user?.displayName}
                </span>
              </>
            ) : (
              <NavLink className={"nav-link px-3 mx-2"} to="/login">
                Login
              </NavLink>
            )}
            {user?.email && (
              <span className="text-white mt-2 ms-3">
                Role: {user?.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  const [activeRoute, setActiveRoute] = useState("home");
  const navigate = useNavigate();

  const handleClick = (routeName, event) => {
    event.preventDefault();
    setActiveRoute(routeName);
    console.log(routeName);
    navigate(`/${routeName}`);
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

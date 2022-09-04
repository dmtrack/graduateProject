import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar bg-light mb-3">
        <div className="container-fluid">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <img
                  src="/client/public/bootstrap-logo.svg"
                  alt=""
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/episodes">
                Выпуски
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Админ-панель
              </Link>
            </li>
          </ul>
          <div className="dropdown">
            <Link to="/login" className="nav-link px-2">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

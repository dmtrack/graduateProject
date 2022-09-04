import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import {getIsLoggedIn} from "../store/slices/userSlice";
import {useSelector} from "react-redux";


const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light d-flex flex-md-column">
        <Link to="/" className="nav-link">
          <img
            src="data:image/jpeg;base64,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"
            alt="logo"
            width="90"
            height="68
            "
            className="main-logo d-inline-block align-text-top "
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle Navigations"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse w-100"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav w-100 d-flex flex-md-column text-center text-md-end">
            <li>
              <Link className="nav-link" aria-current="page" to="/">
                О проекте
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/episodes">
                Выпуски
              </Link>
              <Link className="nav-link" to="/team">
                Команда
              </Link>
              {/*<Link className="nav-link" to="/login">*/}
              {/*  Вход*/}
              {/*</Link>*/}
              <div >
                {isLoggedIn ? (
                    <NavProfile />
                ) : (
                    <Link className="nav-link" aria-current="page" to="/login">
                      Вход
                    </Link>
                )}
              </div>
            </li>
          </ul>
        </div>

      </nav>
    </>
  );
};

export default NavBar;

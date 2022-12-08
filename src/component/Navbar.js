import React from "react";
import { Link, useLocation ,useNavigate } from "react-router-dom";
import Alert from "./Alert";
const Navbar = () => {
  let location = useLocation();
  const navigate=useNavigate();
  const handelLogout =(e)=>{
       e.preventDefault();
       localStorage.removeItem('token')
       localStorage.removeItem('userEmail')
       navigate("/login")
  }
  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
        <div className="container-fluid">
          <Link className="navbar-brand text-warning" to="/">
            iNotebook
          </Link>
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
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
              {!localStorage.getItem('token')?<div><Link className="btn btn-outline-warning mx-1" to="/login">Login</Link>
            <Link className="btn btn-outline-dark bg-warning text-dark mx-1" to="signup">Sign Up</Link></div>
              :<div>
                <span className="text-light">{localStorage.getItem('userEmail')}</span>
                <button className="btn btn-outline-dark bg-warning text-dark mx-1" onClick={handelLogout} >Logout</button>
              </div>}
          </div>
         
        </div>
      </nav>
      <Alert/>
    </div>
  );
};

export default Navbar;

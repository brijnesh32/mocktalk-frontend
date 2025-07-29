import React from "react";
import "../css/Header.css"; // You can change this to Welcome.css if that's the correct file

const Header = ({ setIsLoginOpen }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="https://t4.ftcdn.net/jpg/03/97/02/07/360_F_397020794_LXE0WLqWxcbhIf2UwXfRtLJwjw8aX5Wj.jpg"
            alt="MockTalk Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">
            <span className="text-primary">MockTalk</span> <span>.AI</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mocktalkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mocktalkNavbar">
          <ul className="navbar-nav mb-2 mb-md-0 me-xl-3">
            <li className="nav-item">
              <a className="nav-link h5" href="/about/">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link h5" href="/blognew/">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link h5" href="/docs/">Docs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link h5" href="/contact/">Contact</a>
            </li>
            <li className="nav-item">
              <button
                className="login-button btn btn-primary animate__backInDown"
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

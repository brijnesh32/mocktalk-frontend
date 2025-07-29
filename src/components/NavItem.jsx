// components/NavItem.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, label }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link h5" to={to}>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;

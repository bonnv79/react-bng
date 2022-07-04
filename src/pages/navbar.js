import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <b>React and MongoDB</b>
        </NavLink>

        <NavLink className="nav-link" to="/create">
          Create Record
        </NavLink>
      </nav>
    </div>
  );
}

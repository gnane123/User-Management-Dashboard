import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>User Management Dashboard</h2>
      </div>

      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Users</a>
        <a href="#">Reports</a>
        <a href="#">Settings</a>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from "react"; 
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaCog, FaBars, FaHome } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width to handle responsive automatically
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (windowWidth < 768) setIsOpen(false);
    else setIsOpen(true);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    <>
      {/* Mobile toggle button */}
      {windowWidth < 768 && (
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={22} />
        </button>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>Admin Panel</h2>
      <ul>

  {/* 🔥 HOME LINK */}
  <li>
    <NavLink 
      to="/" 
      className={({ isActive }) => isActive ? "active" : ""}
    >
      <FaHome className="icon" /> Home
    </NavLink>
  </li>

  <li>
    <NavLink 
      to="/admin/dashboard" 
      end 
      className={({ isActive }) => isActive ? "active" : ""}
    >
      <FaTachometerAlt className="icon" /> Dashboard
    </NavLink>
  </li>

  <li>
    <NavLink 
      to="/admin/products" 
      className={({ isActive }) => isActive ? "active" : ""}
    >
      <FaBoxOpen className="icon" /> Products
    </NavLink>
  </li>

  <li>
    <NavLink 
      to="/admin/orders" 
      className={({ isActive }) => isActive ? "active" : ""}
    >
      <FaShoppingCart className="icon" /> Order History
    </NavLink>
  </li>

</ul>


      </aside>
    </>
  );
};

export default Sidebar;

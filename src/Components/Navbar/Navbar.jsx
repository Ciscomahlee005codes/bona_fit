import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <span><span style={{ color:'#fff'}}>Bona</span>Fit</span>
        </div>

        {/* Desktop Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#products" onClick={() => setMenuOpen(false)}>Products</a></li>
          <li><a href="#order" onClick={() => setMenuOpen(false)}>Order</a></li>
           <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
          <li>
            <a href="#contact" className="cta-btn" onClick={() => setMenuOpen(false)}>
              Contact Us
            </a>
          </li>

        </ul>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

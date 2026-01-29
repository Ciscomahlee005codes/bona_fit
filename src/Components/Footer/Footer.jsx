import "./Footer.css";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h2 className="footer-logo">
            Bona<span>Fit</span>
          </h2>
          <p className="footer-text">
            Premium fitness equipment designed to elevate your strength,
            performance, and endurance. Build your dream gym with us.
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="https://wa.me/234XXXXXXXXXX"><FaWhatsapp /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className="footer-col">
          <h3>Products</h3>
          <ul>
            <li><a href="#">Dumbbells</a></li>
            <li><a href="#">Treadmills</a></li>
            <li><a href="#">Benches</a></li>
            <li><a href="#">Weight Plates</a></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul className="contact-info">
            <li>Email: support@fitgear.com</li>
            <li>Phone: +234 XXX XXX XXXX</li>
            <li>Location: Lagos, Nigeria</li>
          </ul>

          <a
            href="https://wa.me/234XXXXXXXXXX"
            className="whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BonaFit. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

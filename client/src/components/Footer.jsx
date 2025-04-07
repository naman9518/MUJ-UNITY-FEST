import { Link } from "react-router-dom";
import "../style.css";
import logo from "../assets/MUJ-Unity-Fest-Logo-6 1.svg"; // ✅ Import logo
import instagramIcon from "../assets/instagram-icon.svg"; // ✅ Import Instagram icon
import whatsappIcon from "../assets/icon _whatsapp.svg"; // ✅ Import WhatsApp icon
import GoToTop from "../components/GoToTop"; // ✅ Correct import

const Footer = () => {
  return (
    <footer className="unity-fest-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img 
              src={logo} 
              alt="MUJ Unity Fest Logo" 
              className="footer-logo" 
            />
            <p className="footer-tagline">
              Uniting Students, Building Connections, Creating Lasting Memories Together
            </p>
          </div>

          <div className="footer-nav">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/competitions">Competitions</Link></li>
              <li><Link to="/sponsor">Sponsor</Link></li>
              <li><Link to="/about-us" className="active">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="social-icons">
            <a 
              href="https://www.instagram.com/muj_unity_fest/" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a 
              href="https://wa.me/919761914738" 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 MUJ Unity Fest. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms-of-service">Terms of Service</Link>
            <span className="separator">|</span>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

    
      <GoToTop />
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/assets/MUJ-Unity-Fest-Logo-6 1.svg";
import instagramIcon from "../../src/assets/instagram-icon.svg";
import whatsappIcon from "../../src/assets/icon _whatsapp.svg"; 
import GoToTop from "./GoToTop";

// Social Icon Component for Reusability
const SocialIcon = ({ href, iconSrc, altText }) => (
  <a href={href} className="social-icon" target="_blank" rel="noopener noreferrer">
    <img src={iconSrc} alt={altText} />
  </a>
);

const Footer = () => {
  return (
    <footer className="unity-fest-footer">
      <div className="container">
        <div className="footer-content">
          {/* Footer Logo Section */}
          <div className="footer-logo-section">
            <img src={logo} alt="MUJ Unity Fest Logo" className="footer-logo" />
            <p className="footer-tagline">
              Uniting Students, Building Connections, Creating Lasting Memories Together
            </p>
          </div>

          {/* Footer Navigation Links */}
          <div className="footer-nav">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/competitions">Competitions</Link></li>
              <li><Link to="/sponsor">Sponsor</Link></li>
              <li><Link to="/about-us" className="active">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Footer Social Media Icons */}
          <div className="social-icons">
            <SocialIcon
              href="https://www.instagram.com/muj_unity_fest/"
              iconSrc={instagramIcon}
              altText="Instagram"
            />
            <SocialIcon
              href="https://wa.me/919761914738"
              iconSrc={whatsappIcon}
              altText="WhatsApp"
            />
          </div>
        </div>

        {/* Footer Bottom Section */}
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

      {/* Scroll To Top Button */}
      <GoToTop />
    </footer>
  );
};

export default Footer;

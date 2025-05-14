import { Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/MUJ-Unity-Fest-Logo-6 1.svg";
import instagramIcon from "../../assets/instagram-icon.svg";
import whatsappIcon from "../../assets/whatsapp.svg";
import GoToTop from "./GoToTop";

const ScrollToTopLink = ({ to, children, className }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

const SocialIcon = ({ href, iconSrc, altText }) => (
  <a 
    href={href} 
    className="social-icon" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <img src={iconSrc} alt={altText} />
  </a>
);

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    return () => {
    };
  }, []);

  return (
    <footer className="unity-fest-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img src={logo} alt="MUJ Unity Fest Logo" className="footer-logo" />
            <p className="footer-tagline">
              Uniting Students, Building Connections, Creating Lasting Memories Together
            </p>
          </div>
          
          <div className="footer-nav">
            <ul>
              <li><ScrollToTopLink to="/home">Home</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/competition">Competition</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/sponsor">Sponsor</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/about">About Us</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/contact">Contact Us</ScrollToTopLink></li>
            </ul>
          </div>
          
          <div className="social-icons">
            <SocialIcon
              href="https://www.instagram.com/muj_unity_fest/"
              iconSrc={instagramIcon}
              altText="Instagram"
            />
            {whatsappIcon && (
              <SocialIcon
                href="https://wa.me/919761914738"
                iconSrc={whatsappIcon}
                altText="WhatsApp"
              />
            )}
            {!whatsappIcon && (
              <a 
                href="https://wa.me/919761914738" 
                className="social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div style={{ color: 'white', fontSize: '14px' }}>WA</div>
              </a>
            )}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 MUJ Unity Fest. All rights reserved.</p>
          <div className="footer-links">
            <ScrollToTopLink to="/privacy-policy">Privacy Policy</ScrollToTopLink>
            <span className="separator">|</span>
            <ScrollToTopLink to="/terms-of-service">Terms & Conditions</ScrollToTopLink>
            <span className="separator">|</span>
            <ScrollToTopLink to="/contact">Contact</ScrollToTopLink>
          </div>
        </div>
      </div>
      
      <GoToTop />
    </footer>
  );
};

export default Footer;
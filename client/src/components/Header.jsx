import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/MUJ-Unity-Fest-Logo-6 1.svg";
import Hamburger from "../assets/burger-menu-svgrepo-com.svg";
import Cross from "../assets/cross-svgrepo-com.svg";
import Signin from "../pages/login";
import Signup from "../pages/signup";
import User from "../assets/user.png"
import "../CSS/style.css"


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setHidden(window.scrollY > lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showLoginModal || showSignupModal ? "hidden" : "auto";
  }, [showLoginModal, showSignupModal]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);
  const toggleSignupModal = () => setShowSignupModal(!showSignupModal);

  // Modal switchers
  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // ✅ Handle login success (triggered from login modal)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""} ${hidden ? "header-hidden" : ""}`}>
        <div className="container header-content">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>

          <button className="nav-toggle" onClick={toggleMenu}>
            <img src={Hamburger} alt="Open Menu" className={`menu-icon ${menuOpen ? "hidden" : ""}`} />
            <img src={Cross} alt="Close Menu" className={`menu-icon ${menuOpen ? "" : "hidden"}`} />
          </button>

          <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <li><a href="/home" className={location.pathname === "/home" ? "active" : ""}>Home</a></li>
            <li><a href="/competition" className={location.pathname === "/competition" ? "active" : ""}>Competitions</a></li>
            <li><a href="/sponsor" className={location.pathname === "/sponsor" ? "active" : ""}>Sponsor</a></li>
            <li><a href="/about" className={location.pathname === "/about" ? "active" : ""}>About Us</a></li>
            <li><a href="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact Us</a></li>
          </ul>

          <div className="auth-buttons">
          {isLoggedIn ? (
  <>
   
   <img src={User} alt="user" className="user-avatar" />
  <button className="btn btn-primary" onClick={() => setIsLoggedIn(false)}>Logout</button>
  </>
) : (
  <>
    <button className="btn btn-primary" onClick={toggleLoginModal}>Login</button>
    <button className="btn btn-outline" onClick={toggleSignupModal}>Signup</button>
  </>
)}

          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <Signin
          toggleLoginModal={toggleLoginModal}
          switchToSignup={switchToSignup}
          onLoginSuccess={handleLoginSuccess} // 👈 Pass handler here
        />
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <Signup
          toggleSignupModal={toggleSignupModal}
          switchToLogin={switchToLogin}
        />
      )}
    </>
  );
};

export default Header;

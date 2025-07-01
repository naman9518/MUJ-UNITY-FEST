import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import Logo from "../../assets/MUJ-Unity-Fest-Logo-6 1.svg";
import Hamburger from "../../assets/burger-menu-svgrepo-com.svg";
import Cross from "../../assets/cross-svgrepo-com.svg";
import Signin from "../../pages/Auth/login/login";
import Signup from "../../pages/Auth/signup/SignUp";
import ProfilePage from "./profilepage";
import "./header.css";
import useAuthStore from "../../store/useAuthStore.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const {user} = useAuthStore();

  useEffect(() => {
    
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setHidden(window.scrollY > 100 && window.scrollY > lastScrollY); 
      lastScrollY = window.scrollY;
    };

    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 
      showLoginModal || showSignupModal || profileModalOpen ? "hidden" : "auto";
  }, [showLoginModal, showSignupModal, profileModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      if (!newIsMobile && menuOpen) {
        setMenuOpen(false);
        document.body.classList.remove("menu-open");
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    if (menuOpen) setMenuOpen(false);
  };
  
  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
    if (menuOpen) setMenuOpen(false);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => setShowLoginModal(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const handleProfileModalChange = (isOpen) => {
    setProfileModalOpen(isOpen);
  };

  // Close menu when clicking on a navigation link
  const handleNavLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.classList.remove("menu-open");
    }
  };

  return (
    <>
      <header
        className={`header ${scrolled ? "scrolled" : ""} ${
          hidden ? "header-hidden" : ""
        }`}
      >
        <div className="header-content">
          <div className="logo">
            <a href="/home">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          
          <nav>
            <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
              <li>
                <a
                  href="/home"
                  className={location.pathname === "/home" ? "active" : ""}
                  onClick={handleNavLinkClick}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/competition"
                  className={location.pathname === "/competition" ? "active" : ""}
                  onClick={handleNavLinkClick}
                >
                  Competitions
                </a>
              </li>
              <li>
                <a
                  href="/sponsor"
                  className={location.pathname === "/sponsor" ? "active" : ""}
                  onClick={handleNavLinkClick}
                >
                  Sponsor
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={location.pathname === "/about" ? "active" : ""}
                  onClick={handleNavLinkClick}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={location.pathname === "/contact" ? "active" : ""}
                  onClick={handleNavLinkClick}
                >
                  Contact Us
                </a>
              </li>
              
              {menuOpen && isMobile && (
                <>
                  {!isLoggedIn && <li className="menu-separator"></li>}
                  {isLoggedIn && (
                    <li className="profile-section">
                      <div className="mobile-profile-wrapper">
                        <ProfilePage onModalChange={handleProfileModalChange} />
                        <span className="profile-text">My Profile</span>
                      </div>
                    </li>
                  )}
                  <li className="auth-buttons-mobile">
                    {isLoggedIn ? (
                      <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={toggleLoginModal}
                        >
                          Login
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={toggleSignupModal}
                        >
                          Signup
                        </button>
                      </>
                    )}
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="mobile-controls">
            <button
              className={`nav-toggle ${profileModalOpen ? "profile-active" : ""}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <img
                src={Hamburger}
                alt="Open Menu"
                className={`menu-icon ${menuOpen ? "hidden" : ""}`}
              />
              <img
                src={Cross}
                alt="Close Menu"
                className={`menu-icon ${menuOpen ? "" : "hidden"}`}
              />
            </button>
          </div>

          {!menuOpen && (
            <div className="auth-buttons">
              {isLoggedIn && (
                <div className="profile-icon-wrapper">
                  <ProfilePage onModalChange={handleProfileModalChange} />
                </div>
              )}
              {!isLoggedIn ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={toggleLoginModal}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={toggleSignupModal}
                  >
                    Signup
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      
      {showLoginModal && (
        <Signin
          toggleLoginModal={toggleLoginModal}
          switchToSignup={switchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
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
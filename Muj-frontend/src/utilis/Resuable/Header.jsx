import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import Logo from "../../assets/MUJ-Unity-Fest-Logo-6 1.svg";
import Hamburger from "../../assets/burger-menu-svgrepo-com.svg";
import Cross from "../../assets/cross-svgrepo-com.svg";
import Signin from "../../pages/Auth/login/login";
import Signup from "../../pages/Auth/signup/SignUp";
import ProfilePage from "./profilepage";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { isLoggedIn, logout } = useAuth(); 
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

  useEffect(() => {
    document.body.style.overflow =
      showLoginModal || showSignupModal ? "hidden" : "auto";
  }, [showLoginModal, showSignupModal]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);
  const toggleSignupModal = () => setShowSignupModal(!showSignupModal);
  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };
  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`header ${scrolled ? "scrolled" : ""} ${
          hidden ? "header-hidden" : ""
        }`}
      >
        <div className="container header-content">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="mobile-controls">
            {isLoggedIn && isMobile && (
              <div className="profile-icon-wrapper">
                <ProfilePage />
              </div>
            )}
            <button className="nav-toggle" onClick={toggleMenu}>
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
          <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <li>
              <a
                href="/home"
                className={location.pathname === "/home" ? "active" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/competition"
                className={location.pathname === "/competition" ? "active" : ""}
              >
                Competitions
              </a>
            </li>
            <li>
              <a
                href="/sponsor"
                className={location.pathname === "/sponsor" ? "active" : ""}
              >
                Sponsor
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={location.pathname === "/about" ? "active" : ""}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact Us
              </a>
            </li>
            {menuOpen && (
              <li className="auth-buttons-mobile">
                {!isLoggedIn ? (
                  <>
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "1rem" }}
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
              </li>
            )}
          </ul>
          {!menuOpen && (
            <div className="auth-buttons">
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
                <>
                  <ProfilePage />
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </>
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
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import Logo from "../../assets/MUJ-Unity-Fest-Logo-6 1.svg";
import Hamburger from "../../assets/burger-menu-svgrepo-com.svg";
import Cross from "../../assets/cross-svgrepo-com.svg";
import Signin from "../../pages/Auth/login/login";
import Signup from "../../pages/Auth/signup/SignUp";
import ProfilePage from "./profilepage";
import LogoutConfirmationModal from "../../pages/Auth/logout/LogoutConfirmationModal.jsx";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const { user, logout, error, loading } = useAuthStore();
  
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      showLoginModal || showSignupModal || profileModalOpen || showLogoutConfirmation 
        ? "hidden" 
        : "auto";
  }, [showLoginModal, showSignupModal, profileModalOpen, showLogoutConfirmation]);

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

  // Handle logout button click - show confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
    setMenuOpen(false); // Close menu if open
  };

  // Handle confirmed logout
  const handleConfirmLogout = async () => {
    try {
      const isLoggedOut = await logout();
      if(isLoggedOut){
      setShowLogoutConfirmation(false);
      window.location.href = '/home';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handle logout cancellation
  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleProfileModalChange = (isOpen) => {
    setProfileModalOpen(isOpen);
  };

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
                  {!user && <li className="menu-separator"></li>}
                  {user && (
                    <li className="profile-section">
                      <div className="mobile-profile-wrapper">
                        <ProfilePage onModalChange={handleProfileModalChange} />
                        <span className="profile-text">My Profile</span>
                      </div>
                    </li>
                  )}
                  <li className="auth-buttons-mobile">
                    {user ? (
                      <button 
                        className="btn btn-primary" 
                        onClick={handleLogoutClick}
                        disabled={loading}
                      >
                        {loading ? 'Logging out...' : 'Logout'}
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
              {user && (
                <div className="profile-icon-wrapper">
                  <ProfilePage onModalChange={handleProfileModalChange} />
                </div>
              )}
              {!user ? (
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
                <button 
                  className="btn btn-primary" 
                  onClick={handleLogoutClick}
                  disabled={loading}
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Existing modals */}
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

      {/* New logout confirmation modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutConfirmation}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
};

export default Header;
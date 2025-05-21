import { useState, useEffect } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button 
          className="top-btn" 
          onClick={goToTop}
          aria-label="Scroll to top"
        >
          <span className="arrow-up">↑</span>
        </button>
      )}
    </>
  );
};

export default GoToTop;
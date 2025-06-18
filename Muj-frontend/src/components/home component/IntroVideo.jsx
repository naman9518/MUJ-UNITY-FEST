import React, { useRef, useEffect, useState } from "react";
import { FiVolumeX, FiVolume2, FiChevronDown } from "react-icons/fi";
import introVideoWeb from "../../../src/assets/muj-fest-hero-intro-web-view.mp4";
import introVideoMobile from "../../../src/assets/muj-fest-hero-intro-mobile-view.mp4";

const IntroVideo = ({ isMuted, handleMuteToggle }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState('rgba(255, 107, 0, 0.3)');

  // Extract dominant color from video frames
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const extractColor = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        animationId = requestAnimationFrame(extractColor);
        return;
      }

      // Set canvas size to a small resolution for performance
      canvas.width = 30;
      canvas.height = 30;
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate multiple color points for more dynamic effect
      const colors = [];
      const sections = 9; // 3x3 grid
      const sectionWidth = Math.floor(canvas.width / 3);
      const sectionHeight = Math.floor(canvas.height / 3);
      
      for (let section = 0; section < sections; section++) {
        const startX = (section % 3) * sectionWidth;
        const startY = Math.floor(section / 3) * sectionHeight;
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let y = startY; y < startY + sectionHeight; y++) {
          for (let x = startX; x < startX + sectionWidth; x++) {
            const pixelIndex = (y * canvas.width + x) * 4;
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            count++;
          }
        }
        
        if (count > 0) {
          colors.push({
            r: Math.floor(r / count),
            g: Math.floor(g / count),
            b: Math.floor(b / count)
          });
        }
      }
      
      // Create dynamic gradient with multiple colors
      const gradientColors = colors.map((color, index) => {
        const opacity = 0.3 + (index * 0.1);
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      });
      
      // Create a complex multi-point gradient
      const backgroundStyle = `
        radial-gradient(circle at 20% 20%, ${gradientColors[0] || 'rgba(255, 107, 0, 0.3)'} 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, ${gradientColors[1] || 'rgba(255, 107, 0, 0.3)'} 0%, transparent 40%),
        radial-gradient(circle at 20% 80%, ${gradientColors[2] || 'rgba(255, 107, 0, 0.3)'} 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, ${gradientColors[3] || 'rgba(255, 107, 0, 0.3)'} 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, ${gradientColors[4] || 'rgba(255, 107, 0, 0.3)'} 0%, transparent 60%),
        linear-gradient(45deg, 
          rgba(${colors[0]?.r || 255}, ${colors[0]?.g || 107}, ${colors[0]?.b || 0}, 0.1) 0%, 
          rgba(${colors[1]?.r || 240}, ${colors[1]?.g || 247}, ${colors[1]?.b || 255}, 0.1) 100%
        )
      `;
      
      setDominantColor(backgroundStyle);
      
      // Continue extracting color every 150ms for smoother dynamic effect
      setTimeout(() => {
        animationId = requestAnimationFrame(extractColor);
      }, 150);
    };

    const handleVideoLoad = () => {
      extractColor();
    };

    video.addEventListener('loadeddata', handleVideoLoad);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.querySelector('.about-event-section') || 
                        document.querySelector('.about-section') ||
                        document.querySelector('main > section:nth-child(2)');
    
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="intro-video-section">
      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Animated background with extracted colors - Full screen */}
      <div 
        className="video-background-blur"
        style={{
          background: dominantColor
        }}
      />
      
      <div className="video-container">
        <video 
          ref={videoRef}
          id="introVideo" 
          muted={isMuted}
          autoPlay 
          loop 
          playsInline
          className="main-video"
        >
          <source src={introVideoWeb} media="(min-width: 768px)" />
          <source src={introVideoMobile} media="(max-width: 767px)" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced mute button */}
        <button
          onClick={handleMuteToggle}
          className="mute-button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
        
        {/* Scroll to content button */}
        <button
          onClick={scrollToContent}
          className="scroll-button"
          aria-label="Scroll to main content"
        >
          <span className="scroll-text">Explore More</span>
          <FiChevronDown className="scroll-icon" />
        </button>
        
        {/* Video overlay gradient */}
        <div className="video-overlay" />
      </div>
    </section>
  );
};

export default IntroVideo;
import React, { useEffect, useRef } from 'react';

function Full() {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Simulate button click when the page loads
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.log('Error attempting to enable full-screen mode:', err.message);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.log('Error attempting to exit full-screen mode:', err.message);
      });
    }
  };

  return (
    <div>
      {/* Button with hidden text for accessibility */}
      <button ref={buttonRef} onClick={toggleFullScreen}>
        Click me to toggle fullscreen
      </button>
      <h1>Press button to toggle fullscreen mode</h1>
    </div>
  );
}

export default Full;

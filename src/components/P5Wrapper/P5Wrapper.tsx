import React, { useRef, useEffect } from 'react';
// Import p5 directly as a script rather than as an ES module
import styles from './P5Wrapper.module.css';

interface P5WrapperProps {
  sketch: (p5: any) => void;
  className?: string;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ sketch, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // For cleanup
    let p5Instance: any = null;
    
    // Define a function to be called once p5 is loaded
    const initializeP5 = () => {
      if (!containerRef.current) return;
      if (typeof window.p5 !== 'function') {
        console.error('p5 not available as a constructor');
        return;
      }
      
      try {
        // Use the global p5 constructor
        p5Instance = new window.p5(sketch, containerRef.current);
      } catch (error) {
        console.error('Error initializing p5:', error);
      }
    };
    
    // Check if p5 is already available globally
    if (typeof window.p5 === 'function') {
      initializeP5();
    } else {
      // Load p5 via script tag
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
      script.async = true;
      script.onload = initializeP5;
      script.onerror = () => console.error('Failed to load p5.js script');
      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (p5Instance && typeof p5Instance.remove === 'function') {
        p5Instance.remove();
      }
    };
  }, [sketch]);
  
  // Apply both the wrapper style from our module and any custom className passed in
  return <div ref={containerRef} className={`${styles.wrapper} ${className || ''}`} />;
};

// Add this to make TypeScript happy with the window.p5 global
declare global {
  interface Window {
    p5: any;
  }
}

export default P5Wrapper;
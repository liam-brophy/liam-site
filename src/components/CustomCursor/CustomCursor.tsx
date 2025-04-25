import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Store cursor size in a ref to avoid recalculating it
  const cursorSizeRef = useRef({ width: 32, height: 32 });
  
  // Use refs for mouse position to avoid unnecessary re-renders
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  // For throttling interactive checks
  const lastCheckTimeRef = useRef(0);

  // Throttled function to check if element is interactive
  const checkInteractive = useCallback((e: MouseEvent) => {
    const now = performance.now();
    // Only check every 100ms for better performance
    if (now - lastCheckTimeRef.current < 100) return;
    lastCheckTimeRef.current = now;
    
    const target = e.target as HTMLElement;
    const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
    
    // Check if the target or any of its parents are interactive
    let element = target;
    let isInteractiveElement = false;
    
    while (element && !isInteractiveElement) {
      if (interactiveElements.includes(element.tagName) || 
          element.hasAttribute('role') || 
          element.onclick !== null ||
          window.getComputedStyle(element).cursor !== 'auto' && 
          window.getComputedStyle(element).cursor !== 'none') {
        isInteractiveElement = true;
      }
      element = element.parentElement as HTMLElement;
    }
    
    setIsInteractive(isInteractiveElement);
  }, []);

  // Update mouse position without immediate DOM updates
  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Animation frame loop for smoother cursor movement
  const animateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      // Calculate center offset using fixed values instead of offsetWidth/Height
      const halfWidth = cursorSizeRef.current.width / 2;
      const halfHeight = cursorSizeRef.current.height / 2;
      
      // Apply transform with the latest mouse position
      cursor.style.transform = `translate3d(${mousePositionRef.current.x - halfWidth}px, ${mousePositionRef.current.y - halfHeight}px, 0)`;
    }
    requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Get actual cursor size from CSS variables or set default
    const computedStyle = getComputedStyle(document.documentElement);
    const cursorSize = parseInt(computedStyle.getPropertyValue('--cursor-size') || '32');
    cursorSizeRef.current = { width: cursorSize, height: cursorSize };

    // Add the class to the document body to hide the default cursor
    document.documentElement.classList.add('custom-cursor-active');
    document.body.classList.add('custom-cursor-active');

    // Make cursor visible after a small delay to prevent flickering
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Start animation loop
    const animationId = requestAnimationFrame(animateCursor);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', checkInteractive);
    
    // Hide the cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up on component unmount
    return () => {
      cancelAnimationFrame(animationId);
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', checkInteractive);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [animateCursor, checkInteractive, updateMousePosition]);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isInteractive ? 'interactive' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      aria-hidden="true"
    >
      <div className="custom-cursor-crosshair"></div>
    </div>
  );
};

export default CustomCursor;
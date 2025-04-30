import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Work from './pages/Work/Work'
import Connect from './pages/Connect/Contact'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound/NotFound' // Import the NotFound component
import CustomCursor from './components/CustomCursor/CustomCursor'
import { ThemeProvider } from './context/ThemeContext'
import { animateFavicon } from './utils/helpers'
import './App.css'

// Custom scrollbar component
const CustomScrollbar = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const [thumbHeight, setThumbHeight] = useState<number>(0);
  const [thumbTop, setThumbTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [startTop, setStartTop] = useState<number>(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Calculate the thumb size and position based on container scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const calculateThumb = () => {
      const containerHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;
      const ratio = containerHeight / contentHeight;
      const trackHeight = trackRef.current?.clientHeight || containerHeight;
      
      // Calculate thumb height (min 30px)
      const calculatedHeight = Math.max(ratio * trackHeight, 30);
      setThumbHeight(calculatedHeight);
      
      // Calculate thumb position
      const scrollRatio = container.scrollTop / (contentHeight - containerHeight);
      const thumbSpace = trackHeight - calculatedHeight;
      const newThumbTop = scrollRatio * thumbSpace;
      setThumbTop(newThumbTop);
    };
    
    // Initial calculation
    calculateThumb();
    
    // Update on scroll
    const handleScroll = () => {
      if (!isDragging) {
        calculateThumb();
      }
    };
    
    // Update on resize
    const handleResize = () => {
      calculateThumb();
    };
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, isDragging]);
  
  // Handle thumb dragging
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      
      const deltaY = e.clientY - startY;
      const newTop = Math.max(0, Math.min(startTop + deltaY, track.clientHeight - thumbHeight));
      setThumbTop(newTop);
      
      // Calculate scroll position
      const ratio = newTop / (track.clientHeight - thumbHeight);
      const scrollPosition = ratio * (container.scrollHeight - container.clientHeight);
      container.scrollTop = scrollPosition;
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, startTop, thumbHeight, containerRef]);
  
  // Handle thumb click
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartTop(thumbTop);
  };
  
  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || e.target !== track) return;
    
    const trackRect = track.getBoundingClientRect();
    const clickRatio = (e.clientY - trackRect.top) / trackRect.height;
    const scrollPosition = clickRatio * (container.scrollHeight - container.clientHeight);
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };
  
  return (
    <div 
      className="scrollbar-track" 
      ref={trackRef}
      onClick={handleTrackClick}
    >
      <div
        ref={thumbRef}
        className={`scrollbar-thumb ${isDragging ? 'active' : ''}`}
        style={{
          height: `${thumbHeight}px`,
          top: `${thumbTop}px`
        }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
};

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  // Add useEffect to handle favicon animation
  useEffect(() => {
    // --- USER ACTION REQUIRED --- 
    // Replace with the actual paths to your favicon frames in the public folder
    const faviconFrames = [
      '/favicons/frame_01.png',
      '/favicons/frame_02.png',
      '/favicons/frame_03.png',
      '/favicons/frame_04.png',
      '/favicons/frame_05.png',
      '/favicons/frame_06.png',
      '/favicons/frame_07.png',
      '/favicons/frame_08.png',
      '/favicons/frame_09.png',
      '/favicons/frame_10.png',
      '/favicons/frame_11.png',
      '/favicons/frame_12.png',
      '/favicons/frame_13.png',
      '/favicons/frame_14.png',
      '/favicons/frame_15.png',
      '/favicons/frame_16.png',
      '/favicons/frame_17.png',
      '/favicons/frame_18.png',
      '/favicons/frame_19.png',
      '/favicons/frame_20.png',
      '/favicons/frame_21.png',
      '/favicons/frame_22.png'
    ];
    const animationInterval = 200; // Adjust interval in milliseconds (e.g., 200ms)

    // Start the animation and get the cleanup function
    const stopAnimation = animateFavicon(faviconFrames, animationInterval);

    // Return the cleanup function to stop animation on component unmount
    return stopAnimation;
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <div className="app-wrapper">
          <div className="navbar-wrapper">
            <Navbar />
          </div>
          {/* Removed animation wrapper */}
          <div className="content-wrapper">
            <CustomScrollbar containerRef={appRef} />
            <div className="app" ref={appRef}>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  {/* Use ProjectDetail for all project routes */}
                  <Route path="/work/project/:projectId" element={<ProjectDetail />} />
                  {/* Redirect /about to /connect */}
                  <Route path="/about" element={<Navigate to="/connect" replace />} />
                  <Route path="/connect" element={<Connect />} />
                  {/* Catch-all route for 404 Not Found page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

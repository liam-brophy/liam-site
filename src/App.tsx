import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Work from './pages/Work/Work'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import { ThemeProvider } from './context/ThemeContext'
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

  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <div className="navbar-wrapper">
            <Navbar />
          </div>
          <div className="content-wrapper">
            <CustomScrollbar containerRef={appRef} />
            <div className="app" ref={appRef}>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
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

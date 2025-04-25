/// <reference types="p5/global" />
import React, { useRef, useEffect } from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from 'react-p5-wrapper';
import p5 from 'p5';
import styles from './ConnectingCanvas.module.css';
import { useTheme } from '../../context/ThemeContext';

// Interface for a grid dot
interface GridDot {
  pos: p5.Vector;
  size: number;
  baseSize: number;
  active: boolean;
  color: string;
  id: number; // Unique identifier for each dot
}

// Interface for a line in the path
interface PathLine {
  start: GridDot;
  end: GridDot;
  timestamp: number; // When the line was created
  opacity: number; // Current opacity value
}

function sketch(p5Instance: P5CanvasInstance) {
  let dots: GridDot[] = [];
  let rows = 8;
  let cols = 12;
  let primaryColor: string;
  let backgroundColor: string;
  let connectDistance: number;
  let mousePos: p5.Vector;
  let margin: number; // Margin to prevent dots from being at the edges
  let path: PathLine[] = []; // Store the path of connected dots
  let lastActiveDotIndex: number = -1; // Track the index of the last active dot
  const FADE_DURATION = 10000; // 10 seconds in milliseconds

  const updateThemeColors = () => {
    if (typeof document !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      primaryColor = computedStyle.getPropertyValue('--color-accent').trim() || '#00ff00';
      backgroundColor = computedStyle.getPropertyValue('--color-background').trim() || '#ffffff';
    } else {
      primaryColor = '#00ff00';
      backgroundColor = '#ffffff';
    }
  };

  p5Instance.setup = () => {
    const container = document.getElementById('connecting-canvas-container');
    if (container) {
      p5Instance.createCanvas(container.offsetWidth, container.offsetHeight).parent(container);
    } else {
      p5Instance.createCanvas(400, 400); // Fallback size
    }
    p5Instance.pixelDensity(1);
    updateThemeColors();
    mousePos = p5Instance.createVector(-100, -100); // Start mouse off-screen
    
    // Set margin to ensure dots aren't on the edge (10% of the smaller dimension)
    margin = p5Instance.min(p5Instance.width, p5Instance.height) * 0.1;
    
    // Calculate connect distance based on canvas dimensions
    connectDistance = p5Instance.min(p5Instance.width, p5Instance.height) / 3.5;
    
    // Create grid
    initializeGrid();
  };

  const initializeGrid = () => {
    dots = [];
    
    // Calculate usable area (excluding margins)
    const usableWidth = p5Instance.width - (2 * margin);
    const usableHeight = p5Instance.height - (2 * margin);
    
    // Calculate cell sizes to ensure uniform spacing
    const cellWidth = usableWidth / (cols - 1);
    const cellHeight = usableHeight / (rows - 1);
    
    // Uniform dot size based on canvas dimensions for consistency with other canvases
    const dotSize = p5Instance.min(p5Instance.width, p5Instance.height) / 80;
    
    let id = 0; // Unique identifier for each dot
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          pos: p5Instance.createVector(
            margin + (i * cellWidth),
            margin + (j * cellHeight)
          ),
          size: dotSize,
          baseSize: dotSize,
          active: false,
          color: primaryColor,
          id: id++
        });
      }
    }
    
    // Reset path when grid is reinitialized
    path = [];
    lastActiveDotIndex = -1;
  };

  p5Instance.draw = () => {
    updateThemeColors();
    p5Instance.background(backgroundColor);
    
    // Update mouse position
    mousePos.x = p5Instance.mouseX;
    mousePos.y = p5Instance.mouseY;
    
    // Reset all dots to inactive
    dots.forEach(dot => {
      dot.active = false;
      dot.size = dot.baseSize;
    });
    
    // Find the closest dot to the mouse that is within the connect distance
    let closestDotIndex = -1;
    let closestDistance = connectDistance;
    
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const d = p5Instance.dist(dot.pos.x, dot.pos.y, mousePos.x, mousePos.y);
      if (d < closestDistance) {
        closestDistance = d;
        closestDotIndex = i;
      }
    }
    
    // If we found a closest dot, mark it as active
    if (closestDotIndex >= 0) {
      dots[closestDotIndex].active = true;
      dots[closestDotIndex].size = dots[closestDotIndex].baseSize * 1.5; // Make it slightly larger
      
      // If this is a different dot than the last active dot, add a line to the path
      if (lastActiveDotIndex >= 0 && lastActiveDotIndex !== closestDotIndex) {
        path.push({
          start: dots[lastActiveDotIndex],
          end: dots[closestDotIndex],
          timestamp: Date.now(),
          opacity: 255 // Start fully opaque
        });
      }
      
      // Update the last active dot
      lastActiveDotIndex = closestDotIndex;
    }
    
    // Update and draw the path
    const currentTime = Date.now();
    
    // Filter out lines that have fully faded
    path = path.filter(line => {
      const age = currentTime - line.timestamp;
      return age < FADE_DURATION;
    });
    
    // Draw all lines in the path
    p5Instance.noFill();
    path.forEach(line => {
      // Calculate opacity based on age
      const age = currentTime - line.timestamp;
      const opacity = p5Instance.map(age, 0, FADE_DURATION, 255, 0);
      line.opacity = opacity;
      
      const lineColor = p5Instance.color(primaryColor);
      lineColor.setAlpha(opacity);
      p5Instance.stroke(lineColor);
      p5Instance.strokeWeight(1.2);
      p5Instance.line(line.start.pos.x, line.start.pos.y, line.end.pos.x, line.end.pos.y);
    });
    
    // Draw all dots
    p5Instance.noStroke();
    dots.forEach(dot => {
      const dotColor = p5Instance.color(primaryColor);
      if (!dot.active) {
        dotColor.setAlpha(150);
      }
      p5Instance.fill(dotColor);
      p5Instance.ellipse(dot.pos.x, dot.pos.y, dot.size, dot.size);
    });
  };

  p5Instance.windowResized = () => {
    const container = document.getElementById('connecting-canvas-container');
    if (container) {
      p5Instance.resizeCanvas(container.offsetWidth, container.offsetHeight);
      
      // Recalculate margin and connect distance
      margin = p5Instance.min(p5Instance.width, p5Instance.height) * 0.1;
      connectDistance = p5Instance.min(p5Instance.width, p5Instance.height) / 3.5;
      
      // Reinitialize grid
      initializeGrid();
    }
  };
  
  p5Instance.mouseMoved = () => {
    mousePos.x = p5Instance.mouseX;
    mousePos.y = p5Instance.mouseY;
  };
  
  // For touch devices
  p5Instance.touchMoved = () => {
    if (p5Instance.touches && p5Instance.touches.length > 0) {
      // Cast the touch object to access coordinates
      const touch = p5Instance.touches[0] as unknown as { x: number, y: number };
      mousePos.x = touch.x;
      mousePos.y = touch.y;
    }
    return false; // Prevent default
  };
}

const ConnectingCanvas: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme changes are handled inside the sketch
  }, [theme]);

  return (
    <div id="connecting-canvas-container" ref={containerRef} className={styles.canvasContainer}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default ConnectingCanvas;

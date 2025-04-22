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
          color: primaryColor
        });
      }
    }
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
      dot.color = primaryColor;
    });
    
    // Find active dots (near mouse)
    dots.forEach(dot => {
      const d = p5Instance.dist(dot.pos.x, dot.pos.y, mousePos.x, mousePos.y);
      if (d < connectDistance) {
        dot.active = true;
        // Increase dot size based on proximity to mouse, but keep the growth subtle
        dot.size = p5Instance.map(d, 0, connectDistance, dot.baseSize * 2, dot.baseSize);
      }
    });
    
    // Draw connections between active dots
    const activeDots = dots.filter(dot => dot.active);
    
    // Sort connections by distance for better layering
    let connections = [];
    for (let i = 0; i < activeDots.length; i++) {
      for (let j = i + 1; j < activeDots.length; j++) {
        const dot1 = activeDots[i];
        const dot2 = activeDots[j];
        const d = p5Instance.dist(dot1.pos.x, dot1.pos.y, dot2.pos.x, dot2.pos.y);
        
        // Only connect if within reasonable distance
        const maxConnectDist = connectDistance * 1.2;
        if (d < maxConnectDist) {
          connections.push({
            dot1, 
            dot2, 
            distance: d
          });
        }
      }
    }
    
    // Sort connections by distance (farthest first for better layering)
    connections.sort((a, b) => b.distance - a.distance);
    
    // Draw connections
    connections.forEach(conn => {
      // Map distance to opacity: closer dots have stronger lines
      const alpha = p5Instance.map(conn.distance, 0, connectDistance * 1.2, 180, 30);
      let lineColor = p5Instance.color(primaryColor);
      lineColor.setAlpha(alpha);
      p5Instance.stroke(lineColor);
      p5Instance.strokeWeight(p5Instance.map(conn.distance, 0, connectDistance * 1.2, 1.2, 0.3));
      p5Instance.line(conn.dot1.pos.x, conn.dot1.pos.y, conn.dot2.pos.x, conn.dot2.pos.y);
    });
    
    // Draw all dots
    p5Instance.noStroke();
    dots.forEach(dot => {
      p5Instance.fill(dot.color);
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

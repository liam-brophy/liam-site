import React, { useRef, useEffect } from 'react';
import P5Wrapper from '../P5Wrapper/P5Wrapper';
import styles from './GrowingCanvas.module.css';
import { useTheme } from '../../context/ThemeContext';

// Define interfaces for our sketch
interface Leaf {
  pos: { x: number; y: number };
  size: number;
  angle: number;
}

interface VineSegment {
  pos: { x: number; y: number };
  angle: number;
}

// The sketch function with proper type annotations
function sketch(p: any): void {
  let vine: VineSegment[] = [];
  let leaves: Leaf[] = [];
  let currentSegment: VineSegment;
  const baseGrowthSpeed = 0.2;
  const acceleratedGrowthSpeed = 0.8;
  let currentGrowthSpeed = baseGrowthSpeed;
  let angleVariance = p.PI / 18;
  const boundaryBuffer = 20;
  let isMouseInside = false;
  let leafSpawnCounter = 0;
  const leafSpawnFrequency = 15;

  let primaryColor: string = '#00ff00';
  let leafColor: string = '#000000';
  let backgroundColor: string = '#ffffff';

  const updateThemeColors = () => {
    if (typeof document !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      primaryColor = computedStyle.getPropertyValue('--color-accent').trim() || '#00ff00';
      leafColor = computedStyle.getPropertyValue('--color-text').trim() || '#000000'; // Use text color for leaves
      backgroundColor = computedStyle.getPropertyValue('--color-background').trim() || '#ffffff';
    } else {
      primaryColor = '#00ff00';
      leafColor = '#000000'; // Default leaf color
      backgroundColor = '#ffffff';
    }
  };

  p.setup = () => {
    const container = document.getElementById('growing-canvas-container');
    if (container) {
      p.createCanvas(container.offsetWidth, container.offsetHeight).parent(container);
    } else {
      p.createCanvas(400, 400); // Fallback size
    }
    updateThemeColors();
    p.frameRate(30);
    // p.noSmooth(); // Removed for smooth appearance
    // Start vine at the bottom center
    currentSegment = { pos: p.createVector(p.width / 2, p.height), angle: -p.PI / 2 };
    vine.push(currentSegment);
  };

  p.draw = () => {
    updateThemeColors();
    p.background(backgroundColor);

    // Check mouse position and set growth speed
    isMouseInside = p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height;
    currentGrowthSpeed = isMouseInside ? acceleratedGrowthSpeed : baseGrowthSpeed; // Adjust speed based on mouse position

    // Always grow the vine
    let nextAngle = currentSegment.angle + p.random(-angleVariance, angleVariance);
    const currentPos = currentSegment.pos;

    // Boundary checks and angle adjustments
    if (currentPos.x < boundaryBuffer) { // Near left edge
      nextAngle = p.random(-p.PI * 0.4, p.PI * 0.4); // Turn right
    } else if (currentPos.x > p.width - boundaryBuffer) { // Near right edge
      nextAngle = p.random(p.PI * 0.6, p.PI * 1.4); // Turn left
    } else if (currentPos.y < boundaryBuffer) { // Near top edge
      nextAngle = p.random(p.PI * 0.1, p.PI * 0.9); // Turn downwards
    } else if (currentPos.y > p.height - boundaryBuffer && currentSegment.angle < -p.PI * 0.1) { // Near bottom edge (but only if moving upwards)
       // Prevent getting stuck at the bottom after starting
       // Allow turning left or right more freely if near bottom again
       nextAngle = p.random(-p.PI * 0.8, p.PI * -0.2); // Ensure it turns upwards
    }

    // Calculate growth using the current speed
    const growthVector = p.createVector(p.cos(nextAngle) * currentGrowthSpeed * 5, p.sin(nextAngle) * currentGrowthSpeed * 5);
    // Use p instead of global p5
    const nextPos = p.createVector(
      currentSegment.pos.x + growthVector.x,
      currentSegment.pos.y + growthVector.y
    );

    // Ensure the vine doesn't actually go out of bounds
    nextPos.x = p.constrain(nextPos.x, 0, p.width);
    nextPos.y = p.constrain(nextPos.y, 0, p.height);

    currentSegment = { pos: nextPos, angle: nextAngle };
    vine.push(currentSegment);

    // Add leaves periodically
    leafSpawnCounter++;
    if (leafSpawnCounter >= leafSpawnFrequency) {
      leafSpawnCounter = 0;
      const segment = currentSegment; // Add leaf to the newest segment
      const side = p.random() > 0.5 ? 1 : -1; // Place leaf on left or right
      const leafAngle = segment.angle + side * p.PI / 2.5 + p.random(-p.PI / 6, p.PI / 6); // Angle relative to vine segment (more perpendicular)
      const offsetDistance = p.random(5, 10); // How far the leaf base is from the vine
      const offsetVector = p.createVector(p.cos(segment.angle + side * p.PI / 2) * offsetDistance, p.sin(segment.angle + side * p.PI / 2) * offsetDistance);
      // Use p instead of global p5.Vector
      const leafPos = p.createVector(
        segment.pos.x + offsetVector.x,
        segment.pos.y + offsetVector.y
      );

      leaves.push({
          pos: leafPos,
          size: p.random(15, 25), // Larger leaves
          angle: leafAngle
      });
    }

    // Draw vine
    p.noFill();
    p.stroke(primaryColor);
    p.strokeWeight(3);
    p.beginShape();
    for (const seg of vine) {
      p.vertex(seg.pos.x, seg.pos.y);
    }
    p.endShape();

    // Draw leaves using the theme-dependent leafColor
    p.fill(leafColor); // Use theme color for leaves
    p.noStroke(); // No outline for the pixel leaves
    // Removed rectMode(CENTER)

    for (const leaf of leaves) {
      p.push();
      p.translate(leaf.pos.x, leaf.pos.y);
      p.rotate(leaf.angle);

      // Reverted to drawing leaves with ellipse
      p.ellipse(0, 0, leaf.size, leaf.size * 0.6); // Main part

      p.pop();
    }
    // Optional: Reset rectMode if needed elsewhere, though likely not here.
    // p.rectMode(p.CORNER); 
  };

  // mousePressed no longer adds leaves, could be used for other interactions later
  p.mousePressed = () => {
      // Example: Maybe reset or boost growth?
      // For now, does nothing related to leaves/growth.
  };

  p.windowResized = () => {
    const container = document.getElementById('growing-canvas-container');
     if (container) {
       p.resizeCanvas(container.offsetWidth, container.offsetHeight);
       // Reset the animation on resize for simplicity
       vine = [];
       leaves = [];
       currentSegment = { pos: p.createVector(p.width / 2, p.height), angle: -p.PI / 2 };
       vine.push(currentSegment);
       isMouseInside = false; // Reset mouse state
       leafSpawnCounter = 0;
       currentGrowthSpeed = baseGrowthSpeed; // Reset speed
     }
  };
}

const GrowingCanvas: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // No specific effect needed for theme change as sketch handles it in draw
  useEffect(() => {
    // console.log("Theme changed to:", theme);
  }, [theme]);

  return (
    <div id="growing-canvas-container" ref={containerRef} className={styles.canvasContainer}>
      <P5Wrapper sketch={sketch} className={styles.canvas} />
    </div> 
  );
};

export default GrowingCanvas;


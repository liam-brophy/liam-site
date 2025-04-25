import React, { useRef, useEffect } from 'react';
import P5Wrapper from '../P5Wrapper/P5Wrapper';
import styles from './GrowingCanvas.module.css';
import { useTheme } from '../../context/ThemeContext';

// Define interfaces for our sketch
interface Leaf {
  pos: { x: number; y: number };
  size: number;
  angle: number;
  attachedToVine: boolean;
  fallSpeed?: number;
  swayPhase?: number;
  swaySpeed?: number;
  swayAmount?: number;
  stemLength?: number;
  opacity?: number; // Add opacity for fade effect
}

interface VineSegment {
  pos: { x: number; y: number };
  angle: number;
  opacity?: number; // Add opacity for fade effect
}

interface ThornData {
  x: number;
  y: number;
  angle: number;
  length: number;
  opacity?: number; // Add opacity for fade effect
}

// The sketch function with proper type annotations
function sketch(p: any): void {
  let vine: VineSegment[] = [];
  let leaves: Leaf[] = [];
  let thorns: ThornData[] = []; // Store thorns data
  let currentSegment: VineSegment;
  const baseGrowthSpeed = 0.2;
  const acceleratedGrowthSpeed = 0.8;
  let currentGrowthSpeed = baseGrowthSpeed;
  let angleVariance = p.PI / 18;
  const boundaryBuffer = 30; // Increased buffer for better edge detection
  let isMouseInside = false;
  let leafSpawnCounter = 0;
  const leafSpawnFrequency = 35; // Increased frequency (was 50) to make leaves appear more often
  let frameCount = 0;
  
  // Dissolve effect variables
  const MAX_VINE_LENGTH = 1500; // Maximum vine length before dissolve
  let isDissolving = false;
  let dissolveStartFrame = 0;
  const DISSOLVE_DURATION = 60; // Duration of dissolve effect in frames (2 seconds at 30fps)
  let navbarColor: string = '#495057'; // Default navbar color (will be updated)

  let primaryColor: string = '#00ff00';
  let leafColor: string = '#000000';
  let backgroundColor: string = '#ffffff';

  const updateThemeColors = () => {
    if (typeof document !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      primaryColor = computedStyle.getPropertyValue('--color-accent').trim() || '#00ff00';
      leafColor = computedStyle.getPropertyValue('--color-text').trim() || '#000000'; // Use text color for leaves
      backgroundColor = computedStyle.getPropertyValue('--color-background').trim() || '#ffffff';
      navbarColor = computedStyle.getPropertyValue('--color-accent').trim() || '#495057'; // Get navbar color for dissolve
    } else {
      primaryColor = '#00ff00';
      leafColor = '#000000'; // Default leaf color
      backgroundColor = '#ffffff';
      navbarColor = '#495057'; // Default navbar color
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
    // Start vine at the middle of the left edge, pointing right
    currentSegment = { pos: p.createVector(0, p.height / 2), angle: 0 }; // Angle 0 is to the right
    vine.push(currentSegment);
  };

  p.draw = () => {
    updateThemeColors();
    p.background(backgroundColor);
    frameCount++;

    // Check if vine should start dissolving
    if (vine.length > MAX_VINE_LENGTH && !isDissolving) {
      isDissolving = true;
      dissolveStartFrame = frameCount;
      
      // Initialize opacity for all elements
      vine.forEach(seg => { seg.opacity = 1.0; });
      leaves.forEach(leaf => { leaf.opacity = 1.0; });
      thorns.forEach(thorn => { thorn.opacity = 1.0; });
    }
    
    // Handle dissolve effect
    if (isDissolving) {
      const dissolveProgress = (frameCount - dissolveStartFrame) / DISSOLVE_DURATION;
      
      if (dissolveProgress >= 1.0) {
        // Reset everything to start over
        vine = [];
        leaves = [];
        thorns = [];
        currentSegment = { pos: p.createVector(0, p.height / 2), angle: 0 };
        vine.push(currentSegment);
        isDissolving = false;
        leafSpawnCounter = 0;
      } else {
        // Update opacity for all elements based on dissolve progress
        vine.forEach(seg => { seg.opacity = 1.0 - dissolveProgress; });
        leaves.forEach(leaf => { leaf.opacity = 1.0 - dissolveProgress; });
        thorns.forEach(thorn => { thorn.opacity = 1.0 - dissolveProgress; });
        
        // Stop growing during dissolve
        currentGrowthSpeed = 0;
      }
    }
    
    // Only add new segments if not dissolving
    if (!isDissolving) {
      // Check mouse position and set growth speed
      isMouseInside = p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height;
      currentGrowthSpeed = isMouseInside ? acceleratedGrowthSpeed : baseGrowthSpeed;

      // Calculate the next segment
      let nextAngle = currentSegment.angle + p.random(-angleVariance, angleVariance);
      const currentPos = currentSegment.pos;

      // Improved boundary checks for more graceful curling
      if (currentPos.x < boundaryBuffer) { // Near left edge
        // Gentle turn away from left edge
        nextAngle = p.lerp(nextAngle, 0, 0.3); // Bias toward right (0 radians)
      } else if (currentPos.x > p.width - boundaryBuffer) { // Near right edge
        // Gentle turn away from right edge
        nextAngle = p.lerp(nextAngle, p.PI, 0.3); // Bias toward left (PI radians)
      }
      
      if (currentPos.y < boundaryBuffer) { // Near top edge
        // Gentle turn away from top
        nextAngle = p.lerp(nextAngle, p.PI/2, 0.3); // Bias toward down (PI/2 radians)
      } else if (currentPos.y > p.height - boundaryBuffer) { // Near bottom edge
        // Gentle turn away from bottom
        nextAngle = p.lerp(nextAngle, -p.PI/2, 0.3); // Bias toward up (-PI/2 radians)
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

      currentSegment = { pos: nextPos, angle: nextAngle, opacity: 1.0 };
      vine.push(currentSegment);
    }

    // Add leaves periodically (less frequently)
    leafSpawnCounter++;
    if (leafSpawnCounter >= leafSpawnFrequency) {
      leafSpawnCounter = 0;
      const segment = vine[Math.max(0, vine.length - 20)]; // Add leaf to a slightly older segment
      const side = p.random() > 0.5 ? 1 : -1; // Place leaf on left or right
      const leafAngle = segment.angle + side * p.PI / 2.5 + p.random(-p.PI / 6, p.PI / 6); // Base angle
      
      // Position leaf directly on the vine
      const leafPos = p.createVector(
        segment.pos.x,
        segment.pos.y
      );

      // Occasionally make leaves fall (1 in 10 chance)
      const willFall = p.random() < 0.1;

      leaves.push({
        pos: leafPos,
        size: p.random(15, 25), // Size of the leaf
        angle: leafAngle,
        attachedToVine: !willFall, // Most leaves stay attached
        fallSpeed: willFall ? p.random(0.5, 1.5) : undefined, // Fall speed for detached leaves
        swayPhase: p.random(0, p.TWO_PI), // Random starting phase for swaying
        swaySpeed: p.random(0.005, 0.015), // Much slower sway speed
        swayAmount: p.random(0.005, 0.015), // Much more subtle sway amount
        stemLength: p.random(5, 12) // Length of stem connecting leaf to vine
      });
    }

    // Draw vine with increased thickness and apply opacity for dissolve effect
    p.noFill();
    p.stroke(navbarColor); // Use navbar color for dissolve effect
    p.strokeWeight(4.5); // Thicker vine
    p.beginShape();
    for (const seg of vine) {
      // Apply opacity during dissolve
      if (isDissolving && seg.opacity !== undefined) {
        const c = p.color(navbarColor);
        c.setAlpha(255 * seg.opacity);
        p.stroke(c);
      } else {
        p.stroke(primaryColor);
      }
      p.vertex(seg.pos.x, seg.pos.y);
    }
    p.endShape();
    
    // Add subtle thorns to the vine (static, won't move)
    if (frameCount % 30 === 0 && vine.length > 20) { // Only add thorns periodically
      // Pick a segment near the growing tip, but not too close
      const segmentIndex = Math.max(0, vine.length - 20 - Math.floor(p.random(10)));
      const seg = vine[segmentIndex];
      
      if (seg && vine[segmentIndex + 1]) {
        // Calculate the direction of the vine at this point
        const nextSeg = vine[segmentIndex + 1];
        const vineDirection = Math.atan2(
          nextSeg.pos.y - seg.pos.y,
          nextSeg.pos.x - seg.pos.x
        );
        
        const thornLength = p.random(3, 5);
        // Perpendicular to vine direction
        const thornAngle = vineDirection + (p.random() > 0.5 ? p.PI/2 : -p.PI/2);
        
        const thornData = {
          x: seg.pos.x,
          y: seg.pos.y,
          angle: thornAngle,
          length: thornLength
        };
        
        thorns.push(thornData);
      }
    }
    
    // Draw all thorns as triangular points integrated with the vine
    for (const thorn of thorns) {
      p.push();
      p.translate(thorn.x, thorn.y);
      p.rotate(thorn.angle);
      
      // Apply opacity during dissolve effect
      if (isDissolving && thorn.opacity !== undefined) {
        const thornColor = p.color(navbarColor);
        thornColor.setAlpha(255 * thorn.opacity);
        p.fill(thornColor);
      } else {
        p.fill(primaryColor);
      }
      p.noStroke();
      
      // Draw triangular thorn with a wider base to appear connected to vine
      p.beginShape();
      p.vertex(-1, -1.5); // Slightly wider base at vine, offset to appear connected
      p.vertex(thorn.length, 0); // Tip of thorn
      p.vertex(-1, 1.5); // Slightly wider base at vine, offset to appear connected
      p.endShape(p.CLOSE);
      
      p.pop();
    }

    // Update and draw leaves
    for (let i = leaves.length - 1; i >= 0; i--) {
      const leaf = leaves[i];
      
      // Update falling leaves
      if (!leaf.attachedToVine && leaf.fallSpeed) {
        leaf.pos.y += leaf.fallSpeed;
        leaf.angle += 0.01; // Gentle rotation while falling
        
        // Remove leaves that have fallen off the bottom
        if (leaf.pos.y > p.height + 50) {
          leaves.splice(i, 1);
          continue;
        }
      } else if (leaf.swayPhase !== undefined && leaf.swaySpeed !== undefined && leaf.swayAmount !== undefined) {
        // Update the sway phase for attached leaves
        leaf.swayPhase += leaf.swaySpeed;
        // The actual angle changes based on the sin of the phase, with much subtler movement
        leaf.angle += Math.sin(leaf.swayPhase) * leaf.swayAmount;
      }
      
      // Draw leaf
      p.push();
      p.translate(leaf.pos.x, leaf.pos.y);
      p.rotate(leaf.angle);
      
      // Apply opacity for dissolve effect
      let currentLeafColor = leafColor;
      let currentStemColor = leafColor;
      
      if (isDissolving && leaf.opacity !== undefined) {
        // Change to navbar color with opacity during dissolve
        const fadeColor = p.color(navbarColor);
        fadeColor.setAlpha(255 * leaf.opacity);
        currentLeafColor = fadeColor;
        currentStemColor = fadeColor;
      }
      
      // Draw stem first to ensure proper connection to vine
      if (leaf.stemLength) {
        p.strokeWeight(1.5);
        p.stroke(currentStemColor);
        p.line(0, 0, 0, -leaf.stemLength);
        
        // Move the leaf to the end of the stem for better alignment
        p.translate(0, -leaf.stemLength);
      }
      
      // Draw leaf
      p.fill(currentLeafColor);
      p.noStroke();
      p.beginShape();
      const leafBaseWidth = leaf.size * 0.5;
      const leafHeight = leaf.size;
      
      // Simple leaf shape with just basic curves
      p.vertex(0, 0); // Start at stem
      
      // Left side curve
      p.bezierVertex(
        -leafBaseWidth * 0.7, -leafHeight * 0.3,
        -leafBaseWidth, -leafHeight * 0.5,
        -leafBaseWidth * 0.6, -leafHeight * 0.8
      );
      
      // Tip of leaf
      p.vertex(0, -leafHeight);
      
      // Right side curve (mirrored)
      p.bezierVertex(
        leafBaseWidth * 0.6, -leafHeight * 0.8,
        leafBaseWidth, -leafHeight * 0.5,
        leafBaseWidth * 0.7, -leafHeight * 0.3
      );
      
      // Back to stem
      p.vertex(0, 0);
      
      p.endShape();
      
      // Add simple center vein for minimal detail
      p.stroke(leafColor);
      p.strokeWeight(0.5);
      p.line(0, 0, 0, -leafHeight * 0.9);
      
      p.pop();
    }
    
    // Occasionally detach a random leaf (1 in 200 frames)
    if (leaves.length > 5 && frameCount % 200 === 0) {
      const randomLeafIndex = Math.floor(p.random(leaves.length));
      if (leaves[randomLeafIndex].attachedToVine) {
        leaves[randomLeafIndex].attachedToVine = false;
        leaves[randomLeafIndex].fallSpeed = p.random(1, 2);
      }
    }
  };

  // mousePressed no longer adds leaves, could be used for other interactions later
  p.mousePressed = () => {
    // Make a few nearby leaves fall when mouse is pressed
    const mouseVector = p.createVector(p.mouseX, p.mouseY);
    let detachedCount = 0;
    
    for (const leaf of leaves) {
      if (leaf.attachedToVine && detachedCount < 3) {
        const leafVector = p.createVector(leaf.pos.x, leaf.pos.y);
        const distance = p.Vector.dist(mouseVector, leafVector);
        
        if (distance < 50) {
          leaf.attachedToVine = false;
          leaf.fallSpeed = p.random(1, 2);
          detachedCount++;
        }
      }
    }
  };

  p.windowResized = () => {
    const container = document.getElementById('growing-canvas-container');
     if (container) {
       p.resizeCanvas(container.offsetWidth, container.offsetHeight);
       // Reset the animation on resize for simplicity
       vine = [];
       leaves = [];
       // Reset to start from left edge middle
       currentSegment = { pos: p.createVector(0, p.height / 2), angle: 0 };
       vine.push(currentSegment);
       isMouseInside = false; // Reset mouse state
       leafSpawnCounter = 0;
       currentGrowthSpeed = baseGrowthSpeed; // Reset speed
       frameCount = 0;
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


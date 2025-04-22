/// <reference types="p5/global" />
import React, { useRef, useEffect } from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from 'react-p5-wrapper';
import p5 from 'p5'; // Re-add the explicit import
import styles from './ConnectingCanvas.module.css';
import { useTheme } from '../../context/ThemeContext';

// Use imported p5.Vector for types
interface Particle {
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  maxSpeed: number;
  maxForce: number;
  color: string;
}

function sketch(p5Instance: P5CanvasInstance) { // Renamed p5 to p5Instance to avoid conflict
  let particles: Particle[] = [];
  const numParticles = 50;
  let primaryColor: string;
  let backgroundColor: string;
  let connectDistance: number;

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
    updateThemeColors();
    connectDistance = p5Instance.min(p5Instance.width, p5Instance.height) / 5; // Adjust connection distance based on canvas size

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        pos: p5Instance.createVector(p5Instance.random(p5Instance.width), p5Instance.random(p5Instance.height)),
        vel: p5.Vector.random2D().mult(p5Instance.random(0.5, 1.5)), // Use imported p5.Vector static method
        acc: p5Instance.createVector(0, 0),
        maxSpeed: 2,
        maxForce: 0.1,
        color: primaryColor
      });
    }
  };

  p5Instance.draw = () => {
    updateThemeColors(); // Update colors each frame in case theme changes
    p5Instance.background(backgroundColor);

    // Update and draw particles
    particles.forEach(p => {
      // Update color in case theme changed
      p.color = primaryColor;

      // Simple wandering behavior (optional)
      let wanderAngle = p.vel.heading() + p5Instance.random(-0.5, 0.5);
      let wanderForce = p5.Vector.fromAngle(wanderAngle); // Use imported p5.Vector static method
      wanderForce.setMag(p.maxForce);
      p.acc.add(wanderForce);

      // Update velocity and position
      p.vel.add(p.acc);
      p.vel.limit(p.maxSpeed);
      p.pos.add(p.vel);
      p.acc.mult(0); // Reset acceleration

      // Wrap edges
      if (p.pos.x > p5Instance.width) p.pos.x = 0;
      if (p.pos.x < 0) p.pos.x = p5Instance.width;
      if (p.pos.y > p5Instance.height) p.pos.y = 0;
      if (p.pos.y < 0) p.pos.y = p5Instance.height;

      // Draw particle
      p5Instance.fill(p.color);
      p5Instance.noStroke();
      p5Instance.ellipse(p.pos.x, p.pos.y, 5, 5);
    });

    // Draw connections
    p5Instance.stroke(primaryColor);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = p5Instance.dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
        if (d < connectDistance) {
          // Map distance to opacity: closer particles have stronger lines
          const alpha = p5Instance.map(d, 0, connectDistance, 255, 0);
          // Use p5Instance.color to set alpha
          let lineColor = p5Instance.color(primaryColor);
          lineColor.setAlpha(alpha);
          p5Instance.stroke(lineColor);
          p5Instance.strokeWeight(p5Instance.map(d, 0, connectDistance, 2, 0.5)); // Thicker lines for closer particles
          p5Instance.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
        }
      }
    }
  };

  p5Instance.windowResized = () => {
    const container = document.getElementById('connecting-canvas-container');
    if (container) {
      p5Instance.resizeCanvas(container.offsetWidth, container.offsetHeight);
      connectDistance = p5Instance.min(p5Instance.width, p5Instance.height) / 5; // Recalculate connect distance
      // Reset particle positions on resize
      particles.forEach(p => {
        p.pos = p5Instance.createVector(p5Instance.random(p5Instance.width), p5Instance.random(p5Instance.height));
        p.vel = p5.Vector.random2D().mult(p5Instance.random(0.5, 1.5)); // Use imported p5.Vector static method
      });
    }
  };
}

const ConnectingCanvas: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect to potentially handle theme changes if needed outside the sketch
  useEffect(() => {
    // console.log("ConnectingCanvas theme:", theme);
  }, [theme]);

  return (
    <div id="connecting-canvas-container" ref={containerRef} className={styles.canvasContainer}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default ConnectingCanvas;

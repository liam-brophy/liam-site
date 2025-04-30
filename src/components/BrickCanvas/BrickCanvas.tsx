import React, { useEffect, useRef, useState } from 'react';
import styles from './BrickCanvas.module.css';

// Remove the p5 global declaration, we'll use a different approach

interface Brick {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  velocityY: number;
  landed: boolean;
  crumbling: boolean; // Track if the brick is in the process of crumbling
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  opacity: number;
  lifespan: number;
}

interface BrickCanvasProps {
  landingHeight?: number; // Custom landing height for bricks
}

const BrickCanvas: React.FC<BrickCanvasProps> = ({ landingHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any | null>(null);
  const bricks = useRef<Brick[]>([]);
  const particles = useRef<Particle[]>([]); // Store particles for dissolving effect
  const isDragging = useRef<boolean>(false);
  const draggedBrickId = useRef<number | null>(null);
  const dragOffset = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const calculatedLandingHeight = useRef<number | null>(null);
  const [p5Loaded, setP5Loaded] = useState(false);
  
  // First, load the p5.js script dynamically
  useEffect(() => {
    if (window.p5) {
      // p5 is already loaded
      setP5Loaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
    script.async = true;
    script.onload = () => {
      setP5Loaded(true);
    };
    document.body.appendChild(script);
    
    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);
  
  // Then, initialize p5 once the library is loaded
  useEffect(() => {
    if (!p5Loaded || !window.p5 || p5Instance.current) {
      return;
    }
    
    // Create a new p5 instance using the window.p5 object
    const sketch = (p: any) => {
      // Setup function runs once at the beginning
      p.setup = () => {
        const container = containerRef.current;
        if (!container) return;
        
        // Create canvas that fills the container
        const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent(container);
        
        // Apply pixelated rendering
        p.pixelDensity(1);
        
        // Set landing height to almost the very bottom of the canvas
        calculatedLandingHeight.current = landingHeight !== undefined 
          ? landingHeight 
          : p.height - 5; // Just 5 pixels from the bottom
        
        // Spawn just one brick initially instead of multiple
        spawnBrick(p);
        
        // Set up canvas styling
        p.noSmooth(); // Disable anti-aliasing for pixelated look
      };
      
      // Draw function runs continuously
      p.draw = () => {
        p.clear();
        updateBricks(p);
        updateParticles();
        drawBricks(p);
        drawParticles(p);
        checkTopCollision(p); // Check if bricks have reached the top
      };
      
      // Handle window resizing
      p.windowResized = () => {
        const container = containerRef.current;
        if (!container) return;
        
        p.resizeCanvas(container.clientWidth, container.clientHeight);
        
        // Recalculate landing height
        calculatedLandingHeight.current = landingHeight !== undefined 
          ? landingHeight 
          : p.height - 5; // Just 5 pixels from the bottom
      };
      
      // Mouse events for dragging bricks
      p.mousePressed = () => {
        // Find brick that was clicked (in reverse to check top bricks first)
        for (let i = bricks.current.length - 1; i >= 0; i--) {
          const brick = bricks.current[i];
          
          if (
            brick.landed && 
            p.mouseX >= brick.x && 
            p.mouseX <= brick.x + brick.width &&
            p.mouseY >= brick.y && 
            p.mouseY <= brick.y + brick.height
          ) {
            isDragging.current = true;
            draggedBrickId.current = brick.id;
            dragOffset.current = {
              x: p.mouseX - brick.x,
              y: p.mouseY - brick.y
            };
            break;
          }
        }
      };
      
      p.mouseDragged = () => {
        if (!isDragging.current || draggedBrickId.current === null) return;
        
        bricks.current = bricks.current.map(brick => {
          if (brick.id === draggedBrickId.current) {
            return {
              ...brick,
              x: p.mouseX - dragOffset.current.x,
              y: p.mouseY - dragOffset.current.y
            };
          }
          return brick;
        });
      };
      
      p.mouseReleased = () => {
        isDragging.current = false;
        draggedBrickId.current = null;
      };
      
      // Helper function to spawn a new brick
      const spawnBrick = (p: any) => {
        // Get the current theme
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Use larger consistent brick size
        const brickWidth = 60;
        const brickHeight = 30;
        const newBrick: Brick = {
          id: Date.now(),
          x: randomBetween(0, p.width - brickWidth),
          y: -brickHeight, // Start above the canvas
          width: brickWidth,
          height: brickHeight,
          // Use white in dark mode, black in light mode for better contrast
          color: isDarkTheme ? '#FFFFFF' : '#000000',
          velocityY: randomBetween(0.5, 1), // Slowed down velocity
          landed: false,
          crumbling: false // Initialize as not crumbling
        };
        
        bricks.current.push(newBrick);
      };
      
      // Update brick positions and check for collisions
      const updateBricks = (p: any) => {
        if (calculatedLandingHeight.current === null) return;
        
        // Spawn new bricks more frequently (about every 2 seconds)
        if (p.frameCount % 120 === 0) {
          spawnBrick(p);
        }
        
        bricks.current = bricks.current.map(brick => {
          // Skip if brick is being dragged or already landed
          if (brick.id === draggedBrickId.current || brick.landed) {
            return brick;
          }
          
          // Update position with gravity
          const newY = brick.y + brick.velocityY;
          
          // Check if brick hit the landing height
          if (newY + brick.height >= calculatedLandingHeight.current!) {
            return {
              ...brick,
              y: calculatedLandingHeight.current! - brick.height,
              landed: true
            };
          }
          
          // Check collision with other landed bricks
          let collision = false;
          let collisionY = newY;
          
          for (const otherBrick of bricks.current) {
            if (otherBrick.landed && brick.id !== otherBrick.id) {
              // Check if this brick is above the other brick and would collide
              if (
                newY + brick.height >= otherBrick.y &&
                newY < otherBrick.y &&
                brick.x < otherBrick.x + otherBrick.width &&
                brick.x + brick.width > otherBrick.x
              ) {
                collision = true;
                collisionY = otherBrick.y - brick.height;
                break;
              }
            }
          }
          
          if (collision) {
            return {
              ...brick,
              y: collisionY,
              landed: true
            };
          }
          
          // Apply gravity
          return {
            ...brick,
            y: newY,
            velocityY: Math.min(brick.velocityY + 0.02, 2) // Slower gravity increase with lower cap
          };
        });
        
        // Remove bricks that have gone beyond the landing area (cleanup)
        bricks.current = bricks.current.filter(brick => {
          return brick.y < calculatedLandingHeight.current! + 100;
        });
      };
      
      // Draw all bricks
      const drawBricks = (p: any) => {
        // Draw each brick with a pixelated style
        bricks.current.forEach(brick => {
          // Main brick color
          p.fill(brick.color);
          p.noStroke();
          p.rect(
            Math.floor(brick.x),
            Math.floor(brick.y),
            brick.width,
            brick.height
          );
          
          // Add 8-bit style highlight (lighter on top/left)
          p.fill(50, 50, 50, 128);
          p.rect(
            Math.floor(brick.x),
            Math.floor(brick.y),
            brick.width,
            2
          );
          p.rect(
            Math.floor(brick.x),
            Math.floor(brick.y),
            2,
            brick.height
          );
          
          // Add 8-bit style shadow (darker on bottom/right)
          p.fill(0, 0, 0, 204);
          p.rect(
            Math.floor(brick.x),
            Math.floor(brick.y + brick.height - 2),
            brick.width,
            2
          );
          p.rect(
            Math.floor(brick.x + brick.width - 2),
            Math.floor(brick.y),
            2,
            brick.height
          );
        });
      };

      // Update particles for dissolving effect
      const updateParticles = () => {
        particles.current = particles.current.filter(particle => {
          // Update particle position
          particle.x += particle.velocityX;
          particle.y += particle.velocityY;
          
          // Apply gravity to particles
          particle.velocityY += 0.05;
          
          // Reduce opacity over time (fade out)
          particle.opacity -= 5;
          
          // Reduce lifespan
          particle.lifespan -= 1;
          
          // Keep particle if still alive
          return particle.lifespan > 0 && particle.opacity > 0;
        });
      };
      
      // Draw particles
      const drawParticles = (p: any) => {
        particles.current.forEach(particle => {
          // Set fill color with opacity
          const color = p.color(particle.color);
          color.setAlpha(particle.opacity);
          p.fill(color);
          p.noStroke();
          
          // Draw particle
          p.rect(
            Math.floor(particle.x),
            Math.floor(particle.y),
            particle.size,
            particle.size
          );
        });
      };
      
      // Create particles when a brick crumbles
      const createParticlesFromBrick = (brick: Brick) => {
        // Number of particles based on brick size
        const particleCount = Math.floor(brick.width * brick.height / 25);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
          const particleSize = randomBetween(2, 6);
          const particle: Particle = {
            id: Date.now() + i,
            x: brick.x + randomBetween(0, brick.width),
            y: brick.y + randomBetween(0, brick.height),
            size: particleSize,
            color: brick.color,
            velocityX: randomBetween(-1, 1),
            velocityY: randomBetween(-2, 0.5), // Initial upward velocity for some particles
            opacity: 255,
            lifespan: randomBetween(30, 60)
          };
          
          particles.current.push(particle);
        }
      };
      
      // Check if bricks have reached the top of the canvas
      const checkTopCollision = (p: any) => {
        const topThreshold = 50; // Height from top where bricks start triggering dissolution
        
        // Check if any brick has reached the top threshold
        const brickReachedTop = bricks.current.some(brick => 
          brick.landed && brick.y <= topThreshold && !brick.crumbling
        );
        
        // If any brick reached the top, make ALL bricks crumble
        if (brickReachedTop) {
          // Create particles from all bricks
          bricks.current.forEach(brick => {
            if (!brick.crumbling) {
              brick.crumbling = true;
              createParticlesFromBrick(brick);
            }
          });
          
          // Remove all crumbling bricks after particles are created
          bricks.current = bricks.current.filter(brick => !brick.crumbling);
          
          // Spawn a new brick after a short delay (300 frames) to restart the game
          setTimeout(() => {
            if (p5Instance.current) {
              spawnBrick(p);
            }
          }, 2000);
        }
      };
    };
    
    // Initialize the p5 instance using the global window.p5
    p5Instance.current = new window.p5(sketch);
    
    // Cleanup function
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [p5Loaded, landingHeight]);
  
  // Helper function for random number between min and max
  const randomBetween = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };
  
  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      {!p5Loaded && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

// Add p5 to the window type
declare global {
  interface Window {
    p5: any;
  }
}

export default BrickCanvas;
import React, { useEffect, useRef, useState } from 'react';
import styles from './BrickCanvas.module.css';

interface Brick {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  velocityY: number;
  landed: boolean;
}

interface BrickCanvasProps {
  width?: number;
  height?: number;
  landingHeight?: number; // New prop for custom landing height
}

const BrickCanvas: React.FC<BrickCanvasProps> = ({ 
  width = 300, 
  height = 400,
  landingHeight
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const bricksRef = useRef<Brick[]>([]);
  const lastSpawnTimeRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedBrickId, setDraggedBrickId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [calculatedLandingHeight, setCalculatedLandingHeight] = useState<number | null>(null);
  
  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      // Make canvas fill its container while maintaining aspect ratio
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      
      // Calculate landing height - use prop if provided, otherwise use 60% of canvas height
      const newLandingHeight = landingHeight !== undefined 
        ? landingHeight 
        : Math.floor(canvas.height * 0.6);
      
      setCalculatedLandingHeight(newLandingHeight);
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Start animation
    startAnimation();
    
    // Spawn bricks at intervals - 5 seconds
    const spawnInterval = setInterval(() => {
      spawnBrick();
    }, 5000);
    
    // Spawn one brick immediately
    spawnBrick();
    
    return () => {
      // Clean up
      window.removeEventListener('resize', handleResize);
      clearInterval(spawnInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [landingHeight]);
  
  // Drag and drop functionality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Find brick that was clicked (in reverse to check top bricks first)
      for (let i = bricksRef.current.length - 1; i >= 0; i--) {
        const brick = bricksRef.current[i];
        
        if (
          brick.landed && 
          mouseX >= brick.x && 
          mouseX <= brick.x + brick.width &&
          mouseY >= brick.y && 
          mouseY <= brick.y + brick.height
        ) {
          setIsDragging(true);
          setDraggedBrickId(brick.id);
          setDragOffset({
            x: mouseX - brick.x,
            y: mouseY - brick.y
          });
          break;
        }
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || draggedBrickId === null) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      bricksRef.current = bricksRef.current.map(brick => {
        if (brick.id === draggedBrickId) {
          return {
            ...brick,
            x: mouseX - dragOffset.x,
            y: mouseY - dragOffset.y
          };
        }
        return brick;
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setDraggedBrickId(null);
    };
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggedBrickId, dragOffset]);
  
  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw bricks
      updateBricks();
      drawBricks(ctx);
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const spawnBrick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Generate a brick with random properties
    const brickWidth = randomBetween(20, 40);
    const brickHeight = randomBetween(10, 20);
    const newBrick: Brick = {
      id: Date.now(),
      x: randomBetween(0, canvas.width - brickWidth),
      y: -brickHeight, // Start above the canvas
      width: brickWidth,
      height: brickHeight,
      color: '#000000', // All bricks are black
      velocityY: randomBetween(0.5, 1), // Slowed down velocity
      landed: false
    };
    
    bricksRef.current.push(newBrick);
  };
  
  const updateBricks = () => {
    const canvas = canvasRef.current;
    if (!canvas || calculatedLandingHeight === null) return;
    
    bricksRef.current = bricksRef.current.map(brick => {
      // Skip if brick is being dragged or already landed
      if (brick.id === draggedBrickId || brick.landed) {
        return brick;
      }
      
      // Update position with gravity
      const newY = brick.y + brick.velocityY;
      
      // Check if brick hit the landing height instead of bottom of canvas
      if (newY + brick.height >= calculatedLandingHeight) {
        return {
          ...brick,
          y: calculatedLandingHeight - brick.height,
          landed: true
        };
      }
      
      // Check collision with other landed bricks
      let collision = false;
      let collisionY = newY;
      
      for (const otherBrick of bricksRef.current) {
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
    bricksRef.current = bricksRef.current.filter(brick => {
      return brick.y < calculatedLandingHeight + 100;
    });
  };
  
  const drawBricks = (ctx: CanvasRenderingContext2D) => {
    // Draw each brick with a pixelated style
    bricksRef.current.forEach(brick => {
      // Main brick color - black
      ctx.fillStyle = brick.color;
      ctx.fillRect(
        Math.floor(brick.x),
        Math.floor(brick.y),
        brick.width,
        brick.height
      );
      
      // Add 8-bit style highlight (lighter on top/left)
      ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
      ctx.fillRect(
        Math.floor(brick.x),
        Math.floor(brick.y),
        brick.width,
        2
      );
      ctx.fillRect(
        Math.floor(brick.x),
        Math.floor(brick.y),
        2,
        brick.height
      );
      
      // Add 8-bit style shadow (darker on bottom/right)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(
        Math.floor(brick.x),
        Math.floor(brick.y + brick.height - 2),
        brick.width,
        2
      );
      ctx.fillRect(
        Math.floor(brick.x + brick.width - 2),
        Math.floor(brick.y),
        2,
        brick.height
      );
    });
  };
  
  // Helper function for random number between min and max
  const randomBetween = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };
  
  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.brickCanvas} />
    </div>
  );
};

export default BrickCanvas;
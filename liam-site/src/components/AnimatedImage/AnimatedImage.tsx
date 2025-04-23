import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimatedImage.module.css';

interface AnimatedImageProps {
  frameUrls: string[];
  shortIntervalMs?: number; // Interval for intermediate frames
  longIntervalMs?: number;  // Interval for first and last frames
  alt: string;
  className?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  frameUrls,
  shortIntervalMs = 150, // Faster interval for transitions
  longIntervalMs = 2000, // Longer pause for first/last frames
  alt,
  className = '',
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID

  useEffect(() => {
    // Clear any existing timeout when props change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!frameUrls || frameUrls.length <= 1) {
      console.warn("AnimatedImage requires at least 2 frames.");
      if (frameUrls?.length === 1) setCurrentFrameIndex(0);
      return;
    }

    const animateFrame = () => {
      setCurrentFrameIndex((prevIndex) => {
        let nextIndex = prevIndex + direction;
        let nextDirection = direction;

        // Check boundaries and reverse direction
        if (nextIndex >= frameUrls.length) {
          nextIndex = frameUrls.length - 2;
          nextDirection = -1;
        } else if (nextIndex < 0) {
          nextIndex = 1;
          nextDirection = 1;
        }
        
        setDirection(nextDirection); // Update direction state
        return nextIndex;
      });
    };

    // Determine the delay for the *next* frame change based on the *current* frame
    const currentDelay = 
      currentFrameIndex === 0 || currentFrameIndex === frameUrls.length - 1
        ? longIntervalMs
        : shortIntervalMs;

    // Set the timeout for the next frame change
    timeoutRef.current = setTimeout(animateFrame, currentDelay);

    // Cleanup function to clear timeout on unmount or prop change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // Rerun effect if intervals, frameUrls, currentFrameIndex, or direction change
  }, [frameUrls, shortIntervalMs, longIntervalMs, currentFrameIndex, direction]); 

  if (!frameUrls || frameUrls.length === 0) {
    return <div className={`${styles.imagePlaceholder} ${className}`}>{alt} (No images)</div>;
  }

  return (
    <img
      src={frameUrls[currentFrameIndex]}
      alt={alt}
      className={`${styles.animatedImage} ${className}`}
      loading="lazy"
    />
  );
};

export default AnimatedImage;

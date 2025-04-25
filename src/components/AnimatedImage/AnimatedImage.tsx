import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimatedImage.module.css';

interface AnimatedImageProps {
  frameUrls: string[];
  shortIntervalMs?: number; // Interval for intermediate frames
  longIntervalMs?: number;  // Interval for the first/last frame
  alt: string;
  className?: string;
  // Removed animationType prop
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  frameUrls,
  shortIntervalMs = 150,
  longIntervalMs = 2000,
  alt,
  className = '',
  // Removed animationType prop from destructuring
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!frameUrls || frameUrls.length <= 1) {
      if (frameUrls?.length === 1) setCurrentFrameIndex(0);
      return; // No animation needed
    }

    const animateFrame = () => {
      // Universal ping-pong logic
      setCurrentFrameIndex((prevIndex) => {
        let nextIndex = prevIndex;
        if (direction === 'forward') {
          if (prevIndex === frameUrls.length - 1) {
            setDirection('backward');
            nextIndex = prevIndex - 1;
          } else {
            nextIndex = prevIndex + 1;
          }
        } else { // backward
          if (prevIndex === 0) {
            setDirection('forward');
            nextIndex = prevIndex + 1;
          } else {
            nextIndex = prevIndex - 1;
          }
        }
        // Ensure nextIndex is always valid, especially for 2 frames
        return Math.max(0, Math.min(frameUrls.length - 1, nextIndex));
      });
    };

    // Determine the delay: long delay at the first (index 0) and last (index length - 1) frames
    const isAtBoundary = currentFrameIndex === 0 || currentFrameIndex === frameUrls.length - 1;
    const currentDelay = isAtBoundary ? longIntervalMs : shortIntervalMs;

    timeoutRef.current = setTimeout(animateFrame, currentDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // Removed animationType from dependencies
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

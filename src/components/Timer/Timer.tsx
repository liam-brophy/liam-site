import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

const Timer: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime] = useState<number>(Date.now()); // Store start time in state

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const tick = () => {
      // Calculate elapsed time based on the initial start time
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    };

    // Start the timer immediately
    tick(); // Update immediately to show 0:00 initially
    intervalId = setInterval(tick, 1000);

    // Clear interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // No dependency on document visibility, timer runs as long as component is mounted
  }, [startTime]); // Effect depends only on the initial startTime

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.timerContainer}>
      <span className={styles.timerText}>{formatTime(elapsedTime)}</span>
    </div>
  );
};

export default Timer;

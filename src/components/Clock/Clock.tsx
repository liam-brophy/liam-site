import React, { useState, useEffect } from 'react';
import styles from './Clock.module.css';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update time immediately
    updateTime();
    
    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.clockContainer}>
      <span className={styles.hourglass}>⏳</span>
      <span className={styles.clockText}>{time}</span>
    </div>
  );
};

export default Clock;
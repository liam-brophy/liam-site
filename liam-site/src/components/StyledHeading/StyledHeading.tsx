import React from 'react';
import styles from './StyledHeading.module.css';

interface StyledHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
  className?: string;
}

const StyledHeading: React.FC<StyledHeadingProps> = ({ 
  level = 1, 
  children, 
  className = '' 
}) => {
  // Create the appropriate heading component
  const Heading = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  // Skip styling if children is empty
  if (!children) {
    return <Heading className={className}></Heading>;
  }
  
  // Extract first letter and rest of the text
  const firstLetter = children.charAt(0);
  const restOfText = children.slice(1);
  
  return (
    <Heading className={`${styles.heading} ${className}`}>
      <span className={styles.firstLetter}>{firstLetter}</span>
      <span className={styles.restOfText}>{restOfText}</span>
    </Heading>
  );
};

export default StyledHeading;
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
  // Skip styling if children is empty
  if (!children) {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return <HeadingTag className={className}></HeadingTag>;
  }
  
  // Extract first letter and rest of the text
  const firstLetter = children.charAt(0);
  const restOfText = children.slice(1);
  
  // Choose heading element based on level
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag className={`${styles.heading} ${className}`}>
      <span className={styles.firstLetter}>{firstLetter}</span>
      <span className={styles.restOfText}>{restOfText}</span>
    </HeadingTag>
  );
};

export default StyledHeading;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import AnimatedImage from '../AnimatedImage/AnimatedImage'; // Import the new component

interface CardProps {
  title: string;
  description: string;
  link?: string;
  image?: string; // Keep for single static images
  imageFrames?: string[]; // Add prop for animated images
  tags?: string[];
  external?: boolean;
  animationInterval?: number; // Add prop to Card to control interval
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  image,
  imageFrames, // Destructure the new prop
  tags = [],
  external = false,
  animationInterval, // Destructure the new prop
}) => {
  const cardContent = (
    <>
      {/* Conditionally render AnimatedImage or static img */}
      {(image || imageFrames) && (
        <div className={styles.imageContainer}>
          {imageFrames && imageFrames.length > 0 ? (
            <AnimatedImage 
              frameUrls={imageFrames} 
              alt={title} 
              className={styles.image} 
              intervalMs={animationInterval} // Pass the interval down
            />
          ) : image ? (
            <img src={image} alt={title} className={styles.image} loading="lazy" />
          ) : null}
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (link) {
    // Use an anchor tag for external links
    if (external) {
      return (
        <a href={link} className={styles.card} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      );
    }
    
    // Use React Router Link for internal navigation
    return (
      <Link to={link} className={styles.card}>
        {cardContent}
      </Link>
    );
  }

  return <div className={styles.card}>{cardContent}</div>;
};

export default Card;
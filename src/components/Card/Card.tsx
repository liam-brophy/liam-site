import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import AnimatedImage from '../AnimatedImage/AnimatedImage';

interface CardProps {
  title: string;
  description: string;
  link?: string;
  image?: string;
  imageFrames?: string[];
  videoSrc?: string;
  tags?: string[];
  external?: boolean;
  animationInterval?: number;
  longAnimationInterval?: number;
  date?: string;
  category?: 'design' | 'development' | 'Content Management';
  showVideo?: boolean; // Add prop to control whether videos should be shown
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  image,
  imageFrames,
  videoSrc,
  tags = [],
  external = false,
  animationInterval,
  longAnimationInterval,
  date,
  category,
  showVideo = true, // Default to true for backward compatibility
}) => {
  const cardContent = (
    <>
      {/* Show video if available AND showVideo is true, otherwise show image */}
      {videoSrc && showVideo ? (
        <div className={`${styles.imageContainer} ${styles.videoContainer}`}>
          <div className={styles.videoWrapper}>
            <video 
              src={videoSrc}
              className={`${styles.video} ${title === 'Primer' ? styles.primerVideo : ''}`}
              muted
              loop
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (image || imageFrames) && (
        <div className={styles.imageContainer}>
          {imageFrames && imageFrames.length > 0 ? (
            <AnimatedImage 
              frameUrls={imageFrames} 
              alt={title} 
              className={styles.image} 
              shortIntervalMs={animationInterval}
              longIntervalMs={longAnimationInterval}
            />
          ) : image ? (
            <img src={image} alt={title} className={styles.image} loading="lazy" />
          ) : null}
        </div>
      )}
      
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>

        {(date || category) && (
          <div className={styles.meta}>
            <p className={styles.metaText}>
              {date && <span>{date}</span>}
              {date && category && <span className={styles.separator}> | </span>}
              {category && <span className={styles.category}>{category}</span>}
            </p>
          </div>
        )}
        
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
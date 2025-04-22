import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  link?: string;
  image?: string;
  tags?: string[];
  external?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  image,
  tags = [],
  external = false
}) => {
  const cardContent = (
    <>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
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
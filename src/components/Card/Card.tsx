import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  link?: string;
  image?: string;
  imageFrames?: string[];
  animationInterval?: number;
  longAnimationInterval?: number;
  external?: boolean;
  date?: string;
  category?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  image,
  imageFrames,
  animationInterval,
  longAnimationInterval,
  external,
  date,
  category,
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
        {(date || category) && (
          <div className={styles.meta}>
            {date && <span>{date}</span>}
            {date && category && <span className={styles.separator}> | </span>}
            {category && <span>{category}</span>}
          </div>
        )}
        <p className={styles.description}>{description}</p>
      </div>
    </>
  );

  if (link) {
    return (
      <Link to={link} className={styles.card}>
        {cardContent}
      </Link>
    );
  }

  return <div className={styles.card}>{cardContent}</div>;
};

export default Card;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>
        <span className={styles.pixelscriptLetter}>4</span>
        <span className={styles.pixelscriptLetter}>0</span>
        <span className={styles.pixelscriptLetter}>4</span>
      </h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
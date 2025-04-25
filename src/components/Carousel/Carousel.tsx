import React, { useState } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  altText: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={goToPrevious} className={`${styles.arrow} ${styles.leftArrow}`}>&lt;</button>
      <div className={styles.slide}>
        <img src={images[currentIndex]} alt={`${altText} - Slide ${currentIndex + 1}`} className={styles.image} />
      </div>
      <button onClick={goToNext} className={`${styles.arrow} ${styles.rightArrow}`}>&gt;</button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

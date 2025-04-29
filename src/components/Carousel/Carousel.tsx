import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  altText: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoPlay) {
      interval = window.setInterval(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      }, 4000); // Change image every 4 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoPlay, images.length]);

  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  const goToPrevious = () => {
    setAutoPlay(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setAutoPlay(false);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div 
      className={styles.carousel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button 
        onClick={goToPrevious} 
        className={`${styles.arrow} ${styles.leftArrow} ${isHovering ? styles.visible : ''}`}
        aria-label="Previous image"
      >
        &lt;
      </button>
      
      <div className={styles.slide}>
        <img 
          src={images[currentIndex]} 
          alt={`${altText} - Slide ${currentIndex + 1}`} 
          className={styles.image} 
        />
      </div>
      
      <button 
        onClick={goToNext} 
        className={`${styles.arrow} ${styles.rightArrow} ${isHovering ? styles.visible : ''}`}
        aria-label="Next image"
      >
        &gt;
      </button>
      
      <div className={`${styles.dots} ${isHovering ? styles.visible : ''}`}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

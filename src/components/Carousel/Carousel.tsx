import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  altText: string;
  disableShadow?: boolean; // Prop to disable shadow and border-radius
  maxWidth?: string; // New prop to control image max width
  maxHeight?: string; // New prop to control image max height
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  altText, 
  disableShadow = false,
  maxWidth = '80%', // Default max width
  maxHeight = '80vh' // Default max height
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle key events when carousel is in viewport or focused
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const isVisible = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        
        // Check if carousel is visible or has focus
        if (isVisible || carouselRef.current.contains(document.activeElement)) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevious();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length]); // Dependencies ensure handler updates when relevant state changes

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
      ref={carouselRef}
      tabIndex={0}
      aria-label={`${altText} carousel, ${currentIndex + 1} of ${images.length}`}
    >
      <button 
        onClick={goToPrevious} 
        className={`${styles.simpleArrow} ${styles.leftArrow} ${isHovering ? styles.visible : ''}`}
        aria-label="Previous image"
      >
        &#9664;
      </button>
      
      <div className={styles.slide}>
        <img 
          src={images[currentIndex]} 
          alt={`${altText} - Slide ${currentIndex + 1}`} 
          className={`${styles.image} ${disableShadow ? styles.noShadow : ''}`}
          style={{ 
            maxWidth: maxWidth,
            maxHeight: maxHeight
          }}
        />
      </div>
      
      <button 
        onClick={goToNext} 
        className={`${styles.simpleArrow} ${styles.rightArrow} ${isHovering ? styles.visible : ''}`}
        aria-label="Next image"
      >
        &#9654;
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

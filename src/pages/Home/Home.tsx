import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import StyledHeading from '../../components/StyledHeading/StyledHeading';
import BrickCanvas from '../../components/BrickCanvas/BrickCanvas';
import GrowingCanvas from '../../components/GrowingCanvas/GrowingCanvas';
import ConnectingCanvas from '../../components/ConnectingCanvas/ConnectingCanvas';
import { projects } from '../../data/projects'; // Import projects data
import { Project } from '../../types/project'; // Import the full Project type
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

// Filter out hidden projects and get the first 2 projects
const featuredProjects = projects.filter(project => !project.hidden).slice(0, 2);

// New component for individual project card with image rotation or video
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.imageFrames || []; // Use imageFrames for rotation

  // Determine the single fallback image based on theme
  const fallbackImage = theme === 'dark' ? project.imageDark : project.imageLight;
  const displayImages = images.length > 0 ? images : (fallbackImage ? [fallbackImage] : (project.image ? [project.image] : [])); // Use fallback if imageFrames is empty

  useEffect(() => {
    // Only run the image rotation interval if there's no video and multiple images
    if (!project.videoSrc && displayImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
      }, project.animationInterval || 3000); // Use project interval or default to 3s

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [displayImages, project.animationInterval, project.videoSrc]); // Add videoSrc to dependency array

  return (
    <Link
      to={project.external ? project.link : `/work/${project.id}`}
      key={project.id}
      className={styles.project}
      aria-label={`View project: ${project.title}`}
      target={project.external ? '_blank' : '_self'}
      rel={project.external ? 'noopener noreferrer' : ''}
    >
      <div className={styles.projectImageContainer}> {/* Added image container */}
        {project.videoSrc ? (
          <video
            src={project.videoSrc}
            className={`${styles.projectImage} ${project.title === 'Primer' ? styles.primerVideo : ''}`}
            autoPlay
            loop
            muted // Autoplay often requires muted
            playsInline // Important for iOS Safari
            aria-label={`${project.title} demo video`}
          />
        ) : (
          <>
            {displayImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${project.title} preview ${index + 1}`}
                className={styles.projectImage}
                style={{ opacity: index === currentImageIndex ? 1 : 0 }} // Show only current image
              />
            ))}
            {displayImages.length === 0 && ( // Optional: Placeholder if no images
                 <div className={styles.noImagePlaceholder}>No Image Available</div>
            )}
          </>
        )}
      </div>
      <div className={styles.projectContent}>
        <div> {/* Wrap title and description */}
          <StyledHeading level={3}>{project.title}</StyledHeading>
          <p style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{project.description}</p>
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag, index) => (
              <span key={index} className={styles.tag} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  const phrases = [
    "always building.",
    "always growing.",
    "always connecting."
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const { theme } = useTheme(); // Get theme context

  const handleNext = () => {
    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
  };

  const handlePrev = () => {
    setCurrentPhraseIndex((prevIndex) => (prevIndex - 1 + phrases.length) % phrases.length);
  };

  // Add keyboard navigation for phrases
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixelscriptLetter}>H</span>i, I'm  
            <span className={styles.pixelscriptLetter}> L</span>iam
          </h1>
          <div className={styles.subtitleContainer}> {/* Container for layout */}
            <p className={styles.subtitle} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal', display: 'inline' }}> {/* Changed fontStyle to normal, added display inline */}
              Full stack designer, 
              <button 
                className={styles.inlineArrowButton} 
                onClick={handlePrev} 
                aria-label="Previous phrase"
              >
                &#9664;
              </button>
              <span className={styles.animatedPhrase}> {/* Added wrapper span for animation */}
                <span style={{ fontStyle: 'italic', margin: '0 5px' }}>{phrases[currentPhraseIndex]}</span>
              </span>
              <button 
                className={styles.inlineArrowButton} 
                onClick={handleNext} 
                aria-label="Next phrase"
              >
                &#9654;
              </button>
            </p>
          </div>
          {/* <div className={styles.scrollIndicator}> */}
          {/*   <div className={styles.arrow}></div> */}
          {/* </div> */}
        </div>
        <div className={styles.heroCanvasContainer}>
          {/* Conditionally render canvas based on the current phrase */}
          {phrases[currentPhraseIndex] === "always building." && <BrickCanvas />}
          {phrases[currentPhraseIndex] === "always growing." && <GrowingCanvas />} {/* Use GrowingCanvas */}
          {phrases[currentPhraseIndex] === "always connecting." && <ConnectingCanvas />} {/* Use ConnectingCanvas */}
        </div>
      </section>
      
      <section className={styles.projectsSection} id="projects">
        <div className={styles.projectsList}>
          {featuredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} /> // Use the new ProjectCard component
          ))}
        </div>
      </section>

      {/* Footer section moved outside the main content sections but inside the main container div */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>&copy; {new Date().getFullYear()} Liam Brophy. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/liam-brophy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/liam--brophy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div> // Closing tag for homeContainer
  );
};

export default Home;
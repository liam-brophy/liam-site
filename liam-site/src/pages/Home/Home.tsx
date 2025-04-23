import React, { useState, useEffect } from 'react'; // Removed useRef
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import StyledHeading from '../../components/StyledHeading/StyledHeading';
import BrickCanvas from '../../components/BrickCanvas/BrickCanvas';
import GrowingCanvas from '../../components/GrowingCanvas/GrowingCanvas';
import ConnectingCanvas from '../../components/ConnectingCanvas/ConnectingCanvas';
import { projects } from '../../data/projects'; // Import projects data
import { Project } from '../../types/project'; // Import the full Project type

const featuredProjects = projects.slice(0, 3); // Example: Get first 3 projects

const Home: React.FC = () => {
  const phrases = [
    "always building.",
    "always growing.",
    "always connecting."
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  // Removed projectsRef as it's not used

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
    <div className={styles.homeContainer}> {/* Changed from Fragment to div */} 
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixelscriptLetter}>H</span>i, I'm  
            <span className={styles.pixelscriptLetter}> L</span>iam
          </h1>
          <div className={styles.subtitleContainer}> {/* Container for layout */}
            <p className={styles.subtitle} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal', display: 'inline' }}> {/* Changed fontStyle to normal, added display inline */}
              Full stack designer, 
              <span className={styles.animatedPhrase}> {/* Added wrapper span for animation */}
                <span style={{ fontStyle: 'italic', margin: '0 5px' }}>{phrases[currentPhraseIndex]}</span>
              </span>
            </p>
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.arrow}></div>
          </div>
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
          {featuredProjects.map((project: Project) => ( // Use the imported Project type
            <Link 
              to={project.external ? project.link : `/work/${project.id}`} // Adjust link based on external flag
              key={project.id}
              className={styles.project}
              aria-label={`View project: ${project.title}`}
              target={project.external ? '_blank' : '_self'} // Open external links in new tab
              rel={project.external ? 'noopener noreferrer' : ''}
            >
              <div className={styles.projectContent}>
                <StyledHeading level={3}>{project.title}</StyledHeading>
                <p style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{project.description}</p>
                {/* Removed Date and Category display from here */}
                {project.tags && project.tags.length > 0 && ( // Check if tags exist
                  <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={styles.tag} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer section moved outside the main content sections but inside the main container div */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>&copy; {new Date().getFullYear()} Liam Brophy. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div> // Closing tag for homeContainer
  );
};

export default Home;
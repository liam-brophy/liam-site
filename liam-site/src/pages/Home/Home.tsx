import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import StyledHeading from '../../components/StyledHeading/StyledHeading';
import BrickCanvas from '../../components/BrickCanvas/BrickCanvas';
import GrowingCanvas from '../../components/GrowingCanvas/GrowingCanvas';
import ConnectingCanvas from '../../components/ConnectingCanvas/ConnectingCanvas'; // Import ConnectingCanvas

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const Home: React.FC = () => {
  const phrases = [
    "always building.",
    "always growing.",
    "always connecting."
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const handleNext = () => {
    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
  };

  const handlePrev = () => {
    setCurrentPhraseIndex((prevIndex) => (prevIndex - 1 + phrases.length) % phrases.length);
  };

  // Sample projects for initial development
  const featuredProjects: Project[] = [
    {
      id: 'project1',
      title: 'Artifact',
      description: 'A comprehensive web application built with React, Node.js, and MongoDB.',
      tags: ['React', 'Flask', 'PostgreSQL']
    },
    {
      id: 'project2',
      title: 'Primer',
      description: 'UI/UX design project focusing on user experience and accessibility.',
      tags: ['React', 'Publishing', 'Design Systems']
    },
    {
      id: 'Storied',
      title: 'Mobile App Three',
      description: 'Cross-platform mobile application developed with React Native.',
      tags: ['React Native', 'Firebase', 'Mobile']
    }
  ];

  return (
    <>
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
                <button onClick={handlePrev} className={styles.inlineArrowButton}>&lt;</button> {/* Use a specific class for inline buttons */}
                <span className={styles.animatedPhrase}> {/* Added wrapper span for animation */}
                  <span style={{ fontStyle: 'italic', margin: '0 5px' }}>{phrases[currentPhraseIndex]}</span>
                </span>
                <button onClick={handleNext} className={styles.inlineArrowButton}>&gt;</button> {/* Use a specific class for inline buttons */}
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
          </div> {/* This closing div was missing or misplaced */}
        </section>
        
        {/* Ensure the rest of the component structure is correct */}
        <section className={styles.projectsSection} id="projects">
          <div className={styles.projectsList}>
            {featuredProjects.map((project) => (
              <Link 
                to={`/work/${project.id}`} 
                key={project.id}
                className={styles.project}
                aria-label={`View project: ${project.title}`}
              >
                <div className={styles.projectContent}>
                  <StyledHeading level={3}>{project.title}</StyledHeading>
                  <p style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={styles.tag} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div> {/* Closing tag for homeContainer */}
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright} style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>&copy; {new Date().getFullYear()} Liam Brophy. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ fontFamily: 'arial-nova, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </> // Closing tag for JSX Fragment
  );
};

export default Home;
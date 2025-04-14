import React, { useEffect, useRef } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import StyledHeading from '../../components/StyledHeading/StyledHeading';
import BrickCanvas from '../../components/BrickCanvas/BrickCanvas';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const Home: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  // Sample projects for initial development
  const featuredProjects: Project[] = [
    {
      id: 'project1',
      title: 'Full Stack App One',
      description: 'A comprehensive web application built with React, Node.js, and MongoDB.',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 'project2',
      title: 'Design Project Two',
      description: 'UI/UX design project focusing on user experience and accessibility.',
      tags: ['UI/UX', 'Figma', 'Design Systems']
    },
    {
      id: 'project3',
      title: 'Mobile App Three',
      description: 'Cross-platform mobile application developed with React Native.',
      tags: ['React Native', 'Firebase', 'Mobile']
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all project elements
    if (projectsRef.current) {
      const projectElements = projectsRef.current.querySelectorAll(`.${styles.project}`);
      projectElements.forEach(element => {
        observer.observe(element);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.pixelscriptLetter}>H</span>i, I'm  
              <span className={styles.pixelscriptLetter}> L</span>iam
            </h1>
            <p className={styles.subtitle}>full stack designer, always building.</p>
            <div className={styles.scrollIndicator}>
              <div className={styles.arrow}></div>
            </div>
          </div>
          <div className={styles.heroCanvasContainer}>
            <BrickCanvas landingHeight={120} />
          </div>
        </section>
        
        <section className={styles.projectsSection} id="projects">
          <StyledHeading level={2}>Selected Work</StyledHeading>
          <div className={styles.projectsList} ref={projectsRef}>
            {featuredProjects.map((project) => (
              <Link 
                to={`/work/${project.id}`} 
                key={project.id}
                className={`${styles.project}`}
                aria-label={`View project: ${project.title}`}
              >
                <div className={styles.projectContent}>
                  <StyledHeading level={3}>{project.title}</StyledHeading>
                  <p>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Liam Brophy. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
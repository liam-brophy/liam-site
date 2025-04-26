import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Work.module.css';
import Card from '../../components/Card/Card';
import { useTheme } from '../../context/ThemeContext';
import { projects } from '../../data/projects';
import { Project } from '../../types/project';

const Work: React.FC = () => {
  const { theme } = useTheme();
  const projectRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const scrollContainerRef = useRef<Element | null>(null); // Ref for the scrolling element

  // Projects data is now imported from ../../data/projects

  // Ensure refs array has the same length as projects
  if (projectRefs.current.length !== projects.length) {
    projectRefs.current = Array(projects.length).fill(null).map((_, i) => projectRefs.current[i] || React.createRef<HTMLDivElement>());
  }

  // Scroll handler directly manipulates styles
  const handleScroll = useCallback(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    const containerHeight = scrollElement.clientHeight ?? window.innerHeight;
    const viewportCenterY = containerHeight / 2;

    projectRefs.current.forEach((ref) => {
      if (ref.current) {
        const card = ref.current;
        const cardRect = card.getBoundingClientRect();
        let scale = 0.7; // Default values
        let opacity = 0.3;

        if (cardRect.height > 0) { // Ensure element has dimensions
            // Adjust the reference point to be the approximate division between image and text
            const divisionPointY = cardRect.top + cardRect.height * 0.4; // Approx 40% down
            const distance = Math.abs(viewportCenterY - divisionPointY);

            const maxScale = 1.1; // Increased for larger max size
            const minScale = 0.5; // Increased for less small minimum size
            const maxOpacity = 1.0;
            const minOpacity = 0.3;
            const effectDistance = containerHeight / 2;

            const scaleRange = maxScale - minScale;
            const opacityRange = maxOpacity - minOpacity;
            const normalizedDistance = Math.min(distance / effectDistance, 1);

            scale = maxScale - normalizedDistance * scaleRange;
            opacity = maxOpacity - normalizedDistance * opacityRange;

            scale = isNaN(scale) ? 0.7 : scale;
            opacity = isNaN(opacity) ? 0.3 : opacity;
        }

        requestAnimationFrame(() => {
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
        });
      }
    });
  }, []); // Removed projects.length dependency as it's stable within the component lifecycle

  useEffect(() => {
    const scrollElement = document.querySelector('.app');
    scrollContainerRef.current = scrollElement;

    if (!scrollElement) {
      console.error("Could not find the scrolling element (.app)");
      return;
    }

    handleScroll(); // Initial calculation

    scrollElement.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.container}>
      <div className={styles.projectGrid}>
        {projects.map((project: Project, index) => {
          // Determine the correct image based on theme
          let displayImage = project.image;
          if (project.imageLight && project.imageDark) {
            displayImage = theme === 'dark' ? project.imageDark : project.imageLight;
          }

          return (
            <div
              key={project.id}
              ref={projectRefs.current[index]}
              className={styles.projectCardWrapper}
              style={{ transform: 'scale(0.7)', opacity: '0.3' }}
            >
              <Card
                title={project.title}
                description={project.description}
                image={displayImage}
                imageFrames={project.imageFrames}
                videoSrc={project.videoSrc}
                link={project.link}
                external={project.external}
                animationInterval={project.animationInterval}
                longAnimationInterval={project.longAnimationInterval}
                date={project.date}
                category={project.category}
                showVideo={false} // Don't show videos on Work page
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
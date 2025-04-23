import React, { useEffect, useRef, createRef, useCallback } from 'react'; // Removed useState
import styles from './Work.module.css';
import Card from '../../components/Card/Card';
import { useTheme } from '../../context/ThemeContext';

// Simple debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

const Work: React.FC = () => {
  const { theme } = useTheme();
  const projectRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const scrollContainerRef = useRef<Element | null>(null); // Ref for the scrolling element

  const projects = [
    {
      id: 1,
      title: '',
      description: 'A detailed description of project 1 including technologies used and challenges overcome.',
      image: theme === 'dark' 
        ? '/Project_thumbnails/Artifact_Logo_White.png'
        : '/Project_thumbnails/Artifact_Logo_Black.png',
      link: 'https://www.artifact.online',
      external: true
    },
    {
      id: 2,
      title: '',
      description: 'A detailed description of project 2 including technologies used and challenges overcome.',
      image: theme === 'dark'
        ? '/Project_thumbnails/Primer_Logo_White.png'
        : '/Project_thumbnails/Primer_Logo_Black.png',
      link: 'https://www.primer.press',
      external: true
    },
    {
      id: 3,
      title: 'Storied',
      description: 'A detailed description of project 3 including technologies used and challenges overcome.',
      image: '/path/to/image3.jpg',
      link: '/work/project3'
    },
    {
      id: 4,
      title: 'Editorial Design',
      description: 'A detailed description of project 4 including technologies used and challenges overcome.',
      image: '/path/to/image4.jpg',
      link: '/work/project4'
    },
    {
      id: 5,
      title: "Children's Books",
      description: 'A detailed description of project 5 including technologies used and challenges overcome.',
      image: '/path/to/image5.jpg',
      link: '/work/project5'
    }
  ];

  // Ensure refs array has the same length as projects
  if (projectRefs.current.length !== projects.length) {
    projectRefs.current = Array(projects.length).fill(null).map((_, i) => projectRefs.current[i] || createRef<HTMLDivElement>());
  }

  // Scroll handler directly manipulates styles
  const handleScroll = useCallback(() => {
    // Use scroll container's height if available, otherwise fallback to window
    const containerHeight = scrollContainerRef.current?.clientHeight ?? window.innerHeight;
    const viewportCenterY = containerHeight / 2;

    projectRefs.current.forEach((ref) => {
      if (ref.current) {
        const card = ref.current;
        const cardRect = card.getBoundingClientRect();
        let scale = 0.7; // Default values
        let opacity = 0.3;

        if (cardRect.height > 0) { // Ensure element has dimensions
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const distance = Math.abs(viewportCenterY - cardCenterY);

            const maxScale = 1.0;
            const minScale = 0.7;
            const maxOpacity = 1.0;
            const minOpacity = 0.3;
            const effectDistance = containerHeight / 2;

            const scaleRange = maxScale - minScale;
            const opacityRange = maxOpacity - minOpacity;
            const normalizedDistance = Math.min(distance / effectDistance, 1);

            scale = maxScale - normalizedDistance * scaleRange;
            opacity = maxOpacity - normalizedDistance * opacityRange;

            // Ensure values are valid numbers
            scale = isNaN(scale) ? 0.7 : scale;
            opacity = isNaN(opacity) ? 0.3 : opacity;
        }

        // Apply styles directly within requestAnimationFrame for performance
        requestAnimationFrame(() => {
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
        });
      }
    });
  }, [projects.length]); // Dependency only on projects.length

  useEffect(() => {
    // Find the .app scrolling container
    const scrollElement = document.querySelector('.app');
    scrollContainerRef.current = scrollElement;

    if (!scrollElement) {
      console.error("Could not find the scrolling element (.app)");
      return; // Exit if scroll element not found
    }

    // Calculate and apply initial styles on mount
    handleScroll();

    // Attach listeners to the scrolling element
    scrollElement.addEventListener('scroll', handleScroll);
    // Still listen to window resize as it affects calculations
    window.addEventListener('resize', handleScroll);

    return () => {
      // Remove listeners from the scrolling element
      scrollElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]); // Dependency on handleScroll

  return (
    <div className={styles.container}>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={projectRefs.current[index]}
            className={styles.projectCardWrapper}
          >
            <Card
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              external={project.external}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
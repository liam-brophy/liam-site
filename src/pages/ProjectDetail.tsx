import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectDetail.module.css';
import { projects } from '../data/projects';
import { Project } from '../types/project';
import Carousel from '../components/Carousel/Carousel';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const id = projectId ? parseInt(projectId, 10) : -1;
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject || null);
    setLoading(false);
    
    // Check initial theme
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDarkTheme ? 'dark' : 'light');
    
    // Set up theme change listener
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          setTheme(newTheme);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, [projectId]);

  // Helper function to get the correct Amplify logo based on theme
  const getAmplifyLogo = () => {
    // Use theme-specific PNG files
    return theme === 'dark' 
      ? '/editorial-work/logos/amplify-dark.png' 
      : '/editorial-work/logos/amplify-light.png';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  // For the Storied project (which is hidden but may be directly accessed), show WIP image
  if (project.id === 3 && project.wip) {
    return (
      <div className={styles.projectDetailContainer}>
        <h1 className={styles.projectTitle}>{project.title}</h1>
        <div className={styles.wipContainer} style={{ textAlign: 'center', marginTop: '30px' }}>
          <img 
            src={project.wip} 
            alt={`${project.title} - Work in Progress`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p style={{ marginTop: '20px', fontFamily: 'arial-nova, sans-serif', fontWeight: 400 }}>
            This project is currently under development and will be available soon.
          </p>
        </div>
      </div>
    );
  }

  // For the editorial design project (ID 5), show the split layout
  if (project.id === 5 && project.editorialWorkImages && project.editorialWorkImages.length > 0) {
    return (
      <div className={styles.splitLayout}>
        <div className={styles.carouselColumn}>
          <Carousel 
            images={project.editorialWorkImages} 
            altText={`${project.title} Editorial Work`} 
          />
        </div>
        <div className={styles.contentColumn}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.projectTitle}>Editorial Design</h1>
            
            <p className={styles.contentParagraph}>
              In both in-house and freelance editorial roles, I led design and production for a range of publications, from children's books to academic reports. I pitched and developed cover concepts, typeset full interiors with a focus on readability and structure, and collaborated with printers to ensure accurate specs and high-quality results. I reviewed proofs meticulously and created marketing collateral, including digital graphics and promotional materials, tailored to each project's audience.
            </p>
            
            <div className={styles.logoContainer}>
              <a 
                href="https://www.atlanticcouncil.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.logoLink}
              >
                <img 
                  src="/editorial-work/logos/Atlantic-Council.png" 
                  alt="Atlantic Council Logo" 
                  className={styles.logo}
                />
              </a>
              
              <a 
                href="https://amplifypublishinggroup.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.logoLink}
              >
                <img 
                  src={getAmplifyLogo()} 
                  alt="Amplify Publishing Logo" 
                  className={styles.logo}
                />
              </a>
            </div>
            
            <p className={styles.contentParagraph}>
              In freelance work, I extended this expertise to research-driven projects, producing reports, infographics, and data visualizations that clarified complex information. I also provided digital formatting and typesetting services, transforming raw content into polished, publication-ready materials across print and digital formats.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // For the children's book project (ID 6), show the split layout with updated logo structure
  if (project.id === 6 && project.childrensBookImages && project.childrensBookImages.length > 0) {
    return (
      <div className={styles.splitLayout}>
        <div className={styles.carouselColumn}>
          <div className={styles.childrensBooksCarousel}>
            <Carousel 
              images={project.childrensBookImages} 
              altText={`${project.title} Book Cover`}
              disableShadow={true}
              maxWidth="100%"
              maxHeight="100vh"
            />
          </div>
        </div>
        <div className={styles.contentColumn}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.projectTitle}>Children's Books</h1>
            
            <p className={styles.contentParagraph}>
              I collaborated closely with authors and illustrators to bring children's books to life from concept to final product. My responsibilities included designing multiple cover options that balanced market appeal with the book's unique artistic voice, as well as typesetting interiors to ensure readability and visual harmony for young readers. I acted as a bridge between the creative team and production, working with printers to specify accurate formats, paper stocks, and finishes, and reviewing physical proofs to catch any issues before final printing.
            </p>
            
            <div className={styles.logoContainer}>
              <a 
                href="https://amplifypublishinggroup.com/imprints/childrens-book-publisher/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.logoLink}
              >
                <img 
                  src="/childrens-work/mascotkids.png" 
                  alt="Mascot Kids Logo" 
                  className={styles.logo}
                />
              </a>
              
              <a 
                href="https://amplifypublishinggroup.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.logoLink}
              >
                <img 
                  src={getAmplifyLogo()} 
                  alt="Amplify Publishing Logo" 
                  className={styles.logo}
                />
              </a>
            </div>
            
            <p className={styles.contentParagraph}>
              Beyond production, I supported each title's release with engaging marketing materials, including digital graphics, promotional flyers, and social media assets tailored to each book's aesthetic. I also created accessible ebook versions to broaden distribution across platforms. This role allowed me to merge strong design instincts with careful project management and cross-functional communication—always with a focus on honoring the imagination and detail that go into storytelling for children.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Regular project display for other projects
  return (
    <div className={styles.projectDetailContainer}>
      <h1 className={styles.projectTitle}>{project.title}</h1>
      
      <div className={styles.carouselWrapper}>
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title} 
            className={styles.mainImage} 
          />
        )}
        
        {project.projectImages && project.projectImages.length > 0 && (
          <div className={styles.imageGallery}>
            {project.projectImages.map((imgSrc: string, index: number) => (
              <img 
                key={index}
                src={imgSrc}
                alt={`${project.title} - image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.projectContent}>
        <h2>Overview</h2>
        <p>{project.description}</p>
        
        {project.date && (
          <div>
            <h2>Date</h2>
            <p>{project.date}</p>
          </div>
        )}
        
        {project.tags && project.tags.length > 0 && (
          <div>
            <h2>Technologies</h2>
            <ul className={styles.tagsList}>
              {project.tags.map((tag: string, index: number) => (
                <li key={index} className={styles.tagItem}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
        
        {project.link && (
          <div>
            <h2>Links</h2>
            <a 
              href={project.link} 
              target={project.external ? "_blank" : "_self"} 
              rel={project.external ? "noopener noreferrer" : ""}
            >
              View Project
            </a>
          </div>
        )}
        
        {project.videoSrc && (
          <div>
            <h2>Demo</h2>
            <video 
              controls
              src={project.videoSrc}
              width="100%"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
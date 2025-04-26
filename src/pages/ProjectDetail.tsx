import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectDetail.module.css';
import { projects } from '../data/projects';
import { Project } from '../types/project';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Find the project by ID
    // Convert projectId string to number for comparison
    const id = projectId ? parseInt(projectId, 10) : -1;
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject || null);
    setLoading(false);
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

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
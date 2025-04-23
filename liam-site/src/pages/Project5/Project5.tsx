import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { projects } from '../../data/projects'; // Import project data
import styles from '../ProjectDetail.module.css'; // Corrected import path

const Project5: React.FC = () => {
  // Find the project data for project 5
  const project = projects.find(p => p.id === 5);

  if (!project) {
    return <div>Project not found.</div>;
  }

  // Use imageFrames for the carousel
  const images = project.imageFrames || [];

  return (
    <div className={styles.projectDetailContainer}>
      <h1 className={styles.projectTitle}>{project.title}</h1>
      <div className={styles.carouselWrapper}>
        <Carousel images={images} altText={project.title} />
      </div>
      <div className={styles.projectContent}>
        <p>{project.description}</p>
        {/* Add more details, captions, etc. here */}
      </div>
    </div>
  );
};

export default Project5;

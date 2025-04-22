import React from 'react';
import styles from './Work.module.css';
import Card from '../../components/Card/Card';
import { useTheme } from '../../context/ThemeContext';

const Work: React.FC = () => {
  const { theme } = useTheme();
  
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

  return (
    <div className={styles.container}>
      
      <div className={styles.projectGrid}>
        {projects.map(project => (
          <Card 
            key={project.id}
            title={project.title} 
            description={project.description}
            image={project.image}
            link={project.link}
            external={project.external}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
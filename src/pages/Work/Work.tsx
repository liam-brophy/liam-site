import React from 'react';
import styles from './Work.module.css';
import Card from '../../components/Card/Card';

const Work: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'A detailed description of project 1 including technologies used and challenges overcome.',
      image: '/path/to/image1.jpg',
      link: '/work/project1'
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'A detailed description of project 2 including technologies used and challenges overcome.',
      image: '/path/to/image2.jpg',
      link: '/work/project2'
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'A detailed description of project 3 including technologies used and challenges overcome.',
      image: '/path/to/image3.jpg',
      link: '/work/project3'
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'A detailed description of project 4 including technologies used and challenges overcome.',
      image: '/path/to/image4.jpg',
      link: '/work/project4'
    }
  ];

  return (
    <div className={styles.container}>
      <h1>My Work</h1>
      <p className={styles.intro}>
        Here's a selection of projects I've worked on. Each demonstrates different skills and technologies.
      </p>
      
      <div className={styles.projectGrid}>
        {projects.map(project => (
          <Card 
            key={project.id}
            title={project.title} 
            description={project.description} 
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
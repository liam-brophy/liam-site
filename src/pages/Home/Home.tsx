import React from 'react';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Liam Brophy</h1>
        <p className={styles.subtitle}>Full Stack Developer</p>
      </section>
      
      <section className={styles.featured}>
        <h2>Featured Projects</h2>
        <div className={styles.cards}>
          <Card 
            title="Project 1" 
            description="Description of project 1" 
            link="/work/project1" 
          />
          <Card 
            title="Project 2" 
            description="Description of project 2" 
            link="/work/project2" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
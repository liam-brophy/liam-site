import React from 'react';
import styles from './About.module.css';
import Button from '../../components/Button/Button';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.imageContainer}>
          {/* Replace with actual image when available */}
          <div className={styles.imagePlaceholder}>Profile Photo</div>
        </div>
        
        <div className={styles.content}>
          <h1>About Me</h1>
          <h2>Liam Brophy - Full Stack Developer</h2>
          
          <p>
            I am a passionate full stack developer with expertise in modern web technologies.
            My journey in software development began in [year] and I've been crafting digital 
            experiences ever since.
          </p>
          
          <p>
            I specialize in building responsive, accessible, and performant web applications
            using technologies like React, TypeScript, and Node.js. I'm dedicated to creating
            clean, maintainable code and delivering exceptional user experiences.
          </p>
          
          <h3>Skills</h3>
          <ul className={styles.skillsList}>
            <li>JavaScript/TypeScript</li>
            <li>React & React Native</li>
            <li>Node.js</li>
            <li>HTML/CSS</li>
            <li>UI/UX Design</li>
            <li>Database Design</li>
          </ul>
          
          <div className={styles.actions}>
            <Button variant="primary" onClick={() => window.open('/resume.pdf', '_blank')}>
              Download Resume
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/contact'}>
              Contact Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
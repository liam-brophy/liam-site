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
          
          <p>
          Visual storyteller turned code wrangler who transforms ideas into seamless digital experiences. Since 2021, I've been navigating the creative-technical spectrum with equal parts intuition and precision.
          </p>
          
          <p>
          After mastering design tools as a book designer (covers, interiors, and marketing collateral), I expanded my toolkit through software engineering training in 2025. Now I blend pixel-perfect design sensibilities with robust development practices most commonly using React, TypeScript, Python, and Tailwind CSS.
          </p>

          <p>
          Looking to continue growing as a developer, designer, and creative technologist in environments where digital experiences and human connection intersect.
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
            <Button variant="secondary" onClick={() => window.location.href = '/connect'}>
              Connect Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
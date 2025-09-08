import React from 'react';
import styles from './Home.module.css';
import InteractiveText from '../../components/InteractiveText/InteractiveText';const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <InteractiveText />
    </div>
  );
};

export default Home;
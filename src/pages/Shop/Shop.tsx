import React from 'react';
import styles from './Shop.module.css';
import { Container } from 'react-bootstrap';
import ShopNav from '../../components/ShopNav/ShopNav';

const Shop: React.FC = () => {
  return (
    <div className={styles.shop}>
      <ShopNav />
      <Container className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Shop</h1>
          <p className={styles.description}>
            Welcome to my shop! Here you'll find a collection of my work available for purchase.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Shop;

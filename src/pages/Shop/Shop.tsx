import React from 'react';
import { motion } from 'framer-motion';
import styles from './Shop.module.css';
import { Container } from 'react-bootstrap';

type Product = {
  id: string;
  title: string;
  price: number;
  series?: string;
  dimensions?: string;
  description?: string;
  category: string;
};

type Category = {
  name: string;
  products: Product[];
};

// Placeholder products organized by categories
const CATEGORIES: Category[] = [
  {
    name: 'Editorial Works',
    products: [
      {
        id: 'ed-1',
        title: 'Magazine Layout Design',
        price: 25.0,
        series: 'Editorial Collection',
        dimensions: '297 x 420 mm',
        description: 'Professional magazine layout with modern typography.',
        category: 'editorial'
      },
      {
        id: 'ed-2',
        title: 'Newsletter Template',
        price: 18.5,
        series: 'Editorial Collection',
        dimensions: '210 x 297 mm',
        description: 'Clean newsletter design for corporate communications.',
        category: 'editorial'
      },
      {
        id: 'ed-3',
        title: 'Article Spread',
        price: 22.0,
        series: 'Editorial Collection',
        dimensions: '420 x 297 mm',
        description: 'Double-page article spread with custom illustrations.',
        category: 'editorial'
      }
    ]
  },
  {
    name: 'Children\'s Books',
    products: [
      {
        id: 'cb-1',
        title: 'Adventure Story Illustration',
        price: 35.0,
        series: 'Children\'s Series',
        dimensions: '210 x 210 mm',
        description: 'Colorful illustration for children\'s adventure book.',
        category: 'childrens'
      },
      {
        id: 'cb-2',
        title: 'Character Design Set',
        price: 45.0,
        series: 'Children\'s Series',
        dimensions: '297 x 210 mm',
        description: 'Complete character design package with variations.',
        category: 'childrens'
      },
      {
        id: 'cb-3',
        title: 'Educational Poster',
        price: 28.0,
        series: 'Children\'s Series',
        dimensions: '420 x 594 mm',
        description: 'Interactive educational poster for learning.',
        category: 'childrens'
      }
    ]
  },
  {
    name: 'Experimental Art',
    products: [
      {
        id: 'ex-1',
        title: 'Digital Abstract #1',
        price: 55.0,
        series: 'Experimental Works',
        dimensions: '300 x 300 mm',
        description: 'Abstract digital artwork exploring color and form.',
        category: 'experimental'
      },
      {
        id: 'ex-2',
        title: 'Mixed Media Collage',
        price: 42.0,
        series: 'Experimental Works',
        dimensions: '250 x 350 mm',
        description: 'Mixed media piece combining digital and traditional elements.',
        category: 'experimental'
      },
      {
        id: 'ex-3',
        title: 'Typography Experiment',
        price: 38.0,
        series: 'Experimental Works',
        dimensions: '210 x 297 mm',
        description: 'Experimental typography exploring Gothic letterforms.',
        category: 'experimental'
      }
    ]
  }
];

const Shop: React.FC = () => {
  const handleViewDetails = (product: Product) => {
    console.log('View details for:', product);
    // You can implement navigation or modal here
  };

  return (
    <div className={styles.shopWrapper}>
      <Container className={styles.centerContainer}>
        <h1 className={styles.title}>the Shop</h1>
        <p className={styles.lead}>Explore our collections of unique artistic pieces.</p>
        
        {CATEGORIES.map((category) => (
          <section key={category.name} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <div className={styles.productGrid}>
              {category.products.map((product, productIndex) => (
                <motion.div 
                  key={product.id}
                  className={styles.productCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: productIndex * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <div className={styles.cardInner}>
                    {/* Front of card */}
                    <div className={styles.cardFront}>
                      <div 
                        className={styles.productImage} 
                        data-index={productIndex % 3}
                      >
                        {product.category.toUpperCase()}
                      </div>
                      <h3 className={styles.productName}>{product.title}</h3>
                      <p className={styles.productSeries}>{product.series}</p>
                      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Back of card */}
                    <div className={styles.cardBack}>
                      <h3 className={styles.productName}>{product.title}</h3>
                      <p className={styles.productDescription}>{product.description}</p>
                      <p className={styles.productDimensions}>
                        <strong>Dimensions:</strong> {product.dimensions}
                      </p>
                      <motion.button
                        className={styles.viewButton}
                        onClick={() => handleViewDetails(product)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
};

export default Shop;

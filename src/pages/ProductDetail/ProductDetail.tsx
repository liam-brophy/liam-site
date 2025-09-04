import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ShopNav from '../../components/ShopNav/ShopNav';
import styles from './ProductDetail.module.css';
import { motion } from 'framer-motion';

interface Size {
  size: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  materials?: string;
  sizes?: Size[];
  price?: number;
  description?: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state?.product as Product;
  const [product] = useState<Product | null>(productFromState || null);
  
  // Use the id param to log which product we're viewing
  useEffect(() => {
    if (id && !product) {
      console.log(`Product ID: ${id} - Would fetch product data here if not passed in state`);
      // In a real app, you would fetch the product data here if not passed in state
    }
  }, [id, product]);
  
  if (!product) {
    return (
      <Container className={styles.container}>
        <ShopNav />
        <div className={styles.errorMessage}>
          <h2>Product not found</h2>
          <p>The product you're looking for couldn't be found.</p>
          <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
        </div>
      </Container>
    );
  }
  
  return (
    <div className={styles.productPageWrapper}>
      <ShopNav />
      <Container className={styles.productContainer}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Row>
            <Col md={6}>
              <div 
                className={styles.productImage}
                data-category={product.category}
              >
                {product.category.toUpperCase()}
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{product.title}</h1>
                
                {/* Price display */}
                {'sizes' in product && product.sizes ? (
                  <div className={styles.productSizes}>
                    <h3>Available Sizes</h3>
                    {product.sizes.map((size, index) => (
                      <p key={index} className={styles.productPrice}>
                        {size.size}: ${size.price}
                      </p>
                    ))}
                  </div>
                ) : product.price ? (
                  <p className={styles.productPrice}>${product.price}</p>
                ) : (
                  <p className={styles.productComingSoon}>Coming Soon</p>
                )}
                
                <div className={styles.productDetails}>
                  <p className={styles.productDescription}>{product.description}</p>
                  
                  {product.materials && (
                    <p className={styles.productMeta}>
                      <strong>Materials:</strong> {product.materials}
                    </p>
                  )}
                  
                  <div className={styles.actionButtons}>
                    <Button 
                      variant="primary" 
                      className={styles.addToCartButton}
                      onClick={() => navigate('/shop/cart')}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      className={styles.backButton}
                      onClick={() => navigate('/shop')}
                    >
                      Back to Shop
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default ProductDetail;

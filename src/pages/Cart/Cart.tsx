import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShopNav from '../../components/ShopNav/ShopNav';
import styles from './Cart.module.css';

// Temporary cart item interface - will be replaced with context/state management
interface CartItem {
  id: string;
  title: string;
  price: number;
  size?: string;
  quantity: number;
  category: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  // Mock cart data - in a real app, this would come from context/state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'motw-1',
      title: 'Date Night!',
      price: 44,
      size: '8x10',
      quantity: 1,
      category: 'monster'
    },
    {
      id: 'gb-3',
      title: 'Monster Blood Shelf Piece',
      price: 180,
      size: '20x10',
      quantity: 1,
      category: 'goosebumps'
    }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });
  
  const handleRemoveItem = (id: string, size?: string) => {
    setCartItems(cartItems.filter(item => 
      !(item.id === id && item.size === size)
    ));
  };
  
  const handleQuantityChange = (id: string, size: string | undefined, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      (item.id === id && item.size === size) 
        ? {...item, quantity: newQuantity}
        : item
    ));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you would integrate with Stripe
    alert('Stripe integration will be added later');
    console.log('Checkout data:', { items: cartItems, customer: formData });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 10; // Fixed shipping cost for now
  const total = subtotal + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPageWrapper}>
        <ShopNav />
        <Container className={styles.cartContainer}>
          <div className={styles.emptyCart}>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Button 
              variant="primary" 
              className={styles.continueShoppingBtn}
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }
  
  return (
    <div className={styles.cartPageWrapper}>
      <ShopNav />
      <Container className={styles.cartContainer}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.pageTitle}>Your Cart</h1>
          
          <Row>
            <Col lg={8}>
              <div className={styles.cartItems}>
                <ListGroup>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={`${item.id}-${item.size}-${index}`} className={styles.cartItem}>
                      <div className={styles.itemImage} data-category={item.category}>
                        {item.category.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.itemDetails}>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        {item.size && <p className={styles.itemSize}>Size: {item.size}</p>}
                        <p className={styles.itemPrice}>${item.price}</p>
                      </div>
                      <div className={styles.itemQuantity}>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className={styles.quantityBtn}
                        >
                          -
                        </Button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className={styles.quantityBtn}
                        >
                          +
                        </Button>
                      </div>
                      <div className={styles.itemTotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button 
                        variant="link" 
                        className={styles.removeBtn}
                        onClick={() => handleRemoveItem(item.id, item.size)}
                      >
                        &times;
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                
                <div className={styles.cartActions}>
                  <Button 
                    variant="outline-secondary" 
                    className={styles.continueShoppingBtn}
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className={styles.orderSummary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Form onSubmit={handleCheckout} className={styles.checkoutForm}>
                  <h3 className={styles.formTitle}>Shipping Information</h3>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Select 
                          name="country"
                          value={formData.country}
                          onChange={(e: any) => setFormData({...formData, country: e.target.value})}
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Button 
                    variant="primary" 
                    type="submit"
                    className={styles.checkoutBtn}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Payment
                  </Button>
                  
                  <p className={styles.secureCheckout}>
                    <small>Secure checkout powered by Stripe</small>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Cart;

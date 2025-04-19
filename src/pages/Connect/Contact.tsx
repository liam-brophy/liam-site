import React, { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../../components/Button/Button';

// Renaming the Contact component to Connect
const Connect: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the form data to your backend
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent! I will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.container}>
      <h1>Contact Me</h1>
      <p className={styles.intro}>
        I'm always open to new opportunities and collaborations. 
        Feel free to reach out with any questions or projects you'd like to discuss.
      </p>
      
      <div className={styles.contactWrapper}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          
          {submitStatus && (
            <div className={`${styles.formStatus} ${submitStatus.success ? styles.success : styles.error}`}>
              {submitStatus.message}
            </div>
          )}
        </form>
        
        <div className={styles.contactInfo}>
          <h2>Other Ways to Connect</h2>
          
          <div className={styles.contactMethod}>
            <h3>Email</h3>
            <p><a href="mailto:contact@liambrophy.com">contact@liambrophy.com</a></p>
          </div>
          
          <div className={styles.contactMethod}>
            <h3>LinkedIn</h3>
            <p><a href="https://linkedin.com/in/liambrophy" target="_blank" rel="noopener noreferrer">linkedin.com/in/liambrophy</a></p>
          </div>
          
          <div className={styles.contactMethod}>
            <h3>GitHub</h3>
            <p><a href="https://github.com/liambrophy" target="_blank" rel="noopener noreferrer">github.com/liambrophy</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
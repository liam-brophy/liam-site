import React, { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../../components/Button/Button';

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
      {/* Main wrapper for layout */}
      <div className={styles.connectLayout}>

        {/* Second Column: Bio/Profile (Now First Column) */}
        <section className={styles.profileColumn}>
          <div className={styles.bioContent}>
            <p>
              Visual storyteller turned code wrangler who transforms ideas into seamless digital experiences. Since 2021, I've been navigating the creative-technical spectrum with equal parts intuition and precision.
            </p>
            
            <p>
              After mastering design tools as a book designer (covers, interiors, and marketing collateral), I expanded my toolkit through software engineering training in 2025. Now I blend design sensibilities with robust development practices most commonly using React, TypeScript, Python, and Tailwind CSS.
            </p>

            <p>
              Looking to continue growing as a developer, designer, and creative technologist in environments where digital experiences and human connection intersect.
            </p>
            
            <ul className={styles.skillsList}>
              {/* Frontend */}
              <li data-discipline="frontend">JavaScript</li>
              <li data-discipline="frontend">TypeScript</li>
              <li data-discipline="frontend">React</li>
              <li data-discipline="frontend">HTML / CSS</li>
              <li data-discipline="frontend">Tailwind</li>
              <li data-discipline="frontend">Vite</li>
              {/* Backend */}
              <li data-discipline="backend">Python</li>
              <li data-discipline="backend">Flask</li>
              <li data-discipline="backend">SQL (Postgres)</li>
              <li data-discipline="backend">REST APIs</li>
              {/* Design */}
              <li data-discipline="design">Figma</li>
              <li data-discipline="design">Adobe Creative Suite</li>
              {/* Tools/Other */}
              <li data-discipline="tools">Git</li>
              <li data-discipline="tools">Docker</li>
            </ul>
            
            <div className={styles.actions}>
              <Button variant="primary" onClick={() => window.open('/resume.pdf', '_blank')} fullWidth>
                Download Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Third Column: Contact Form (Now Second Column) */}
        <section className={styles.contactColumn}>
          <p className={styles.intro}>
            I'm always open to new opportunities and collaborations. <br />
            Feel free to reach out with any questions or projects you'd like to discuss.
          </p>
          
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
              fullWidth
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            
            {submitStatus && (
              <div className={`${styles.formStatus} ${submitStatus.success ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </section>
      </div> 
    </div>
  );
};

export default Connect;
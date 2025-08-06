import React, { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';
import Button from '../../components/Button/Button';
import emailjs from '@emailjs/browser';

const Connect: React.FC = () => {
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("QXC_gA8JjKOrvtKxl");
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
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
    setSubmitStatus(null);
    
    try {
      // Set up template parameters for EmailJS
      const templateParams = {
        to_email: 'hello@liam.site',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };
      
      // Send the email using EmailJS with your credentials
      await emailjs.send(
        'service_fzes7ia', // Your EmailJS service ID
        'template_v4x1sp9', // Your EmailJS template ID
        templateParams,
        'QXC_gA8JjKOrvtKxl' // Your EmailJS public key
      );
      
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
      console.error('Failed to send message:', error);
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
              Book designer and visual storyteller with a passion for crafting meaningful narratives across mediums. Since 2021, I've built a career at the intersection of design and technology — specializing in compelling book covers, thoughtful interior layouts, and cohesive publishing experiences that connect deeply with audiences.
            </p>
            
            <p>
              With extensive experience in the publishing industry, I've designed and developed comprehensive visual identities for dozens of titles, helping authors bring their stories to life through careful typography, intentional imagery, and strategic marketing collateral. In 2025, I expanded my creative toolkit with front-end development skills to further bridge the gap between design vision and technical execution.
            </p>

            <p>
              Today, I bring a designer's eye to every project, whether it's crafting the perfect book cover or building responsive web experiences with React. I'm passionate about creating work where aesthetic intuition and technical precision meet — continuing to grow as a multidisciplinary creative who understands both the visual and technical dimensions of storytelling.
            </p>
            
            <ul className={styles.skillsList}>
              {/* Temporarily commented out skill buttons
              <li data-discipline="frontend">JavaScript</li>
              <li data-discipline="frontend">TypeScript</li>
              <li data-discipline="frontend">React</li>
              <li data-discipline="frontend">HTML / CSS</li>
              <li data-discipline="frontend">Tailwind</li>
              <li data-discipline="frontend">Vite</li>
              <li data-discipline="backend">Python</li>
              <li data-discipline="backend">Flask</li>
              <li data-discipline="backend">SQL (Postgres)</li>
              <li data-discipline="backend">REST APIs</li>
              <li data-discipline="design">Figma</li>
              <li data-discipline="design">Adobe Creative Suite</li>
              <li data-discipline="tools">Git</li>
              <li data-discipline="tools">Docker</li>
              */}
            </ul>
            
            <div className={styles.actions}>
              <div className={styles.socialButtons}>
                <Button variant="outline" onClick={() => window.open('https://github.com/liam-brophy', '_blank')} className={styles.githubButton}>
                  GitHub
                </Button>
                <Button variant="outline" onClick={() => window.open('https://medium.com/@liam.tech', '_blank')} className={styles.mediumButton}>
                  Medium
                </Button>
                <Button variant="outline" onClick={() => window.open('https://www.linkedin.com/in/liam--brophy/', '_blank')} className={styles.linkedinButton}>
                  LinkedIn
                </Button>
              </div>
              <Button variant="primary" onClick={() => window.open('/LiamBrophy_Resume.pdf', '_blank')} fullWidth>
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
          
          <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
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
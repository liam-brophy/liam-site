import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Timer from '../Timer/Timer';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navMenuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && 
          navMenuRef.current && 
          !navMenuRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest(`.${styles.menuButton}`)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Add scroll event listener to add background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mobile responsive behavior - lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
      // Add overlay to page content only when menu is open
      const contentElement = document.querySelector('.content-wrapper');
      if (contentElement) {
        contentElement.classList.add(styles.hasOverlay);
      }
    } else {
      document.body.classList.remove('no-scroll');
      // Remove overlay from page content when menu is closed
      const contentElement = document.querySelector('.content-wrapper');
      if (contentElement) {
        contentElement.classList.remove(styles.hasOverlay);
      }
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
      const contentElement = document.querySelector('.content-wrapper');
      if (contentElement) {
        contentElement.classList.remove(styles.hasOverlay);
      }
    };
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        {/* Timer at the top of sidebar */}
        <div className={styles.topSection}>
          <Timer />
        </div>
        
        {/* Main navigation links */}
        <div className={styles.navGroup}>
          <ul ref={navMenuRef} className={`${styles.navMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) => isActive ? styles.active : ''}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/work"
                className={({ isActive }) => isActive ? styles.active : ''}
                onClick={closeMenu}
              >
                Work
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/connect"
                className={({ isActive }) => isActive ? styles.active : ''}
                onClick={closeMenu}
              >
                Connect
              </NavLink>
            </li>
            <li>
              <a 
                href="https://exceptional-experiments.onrender.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={styles.labLink}
              >
                Lab
              </a>
            </li>
          </ul>
        </div>
        
        {/* Theme toggle at the bottom of sidebar */}
        <div className={styles.bottomSection}>
          <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div>
        </div>

        {/* Moved menu button outside of navGroup for better mobile positioning */}
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.menuIcon}></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
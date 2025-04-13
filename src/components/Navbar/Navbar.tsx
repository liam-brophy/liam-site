import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Navigation menu */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
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
              to="/about"
              className={({ isActive }) => isActive ? styles.active : ''}
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact"
              className={({ isActive }) => isActive ? styles.active : ''}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        
        {/* Right side - theme toggle and menu button */}
        <div className={styles.navActions}>
          {/* Theme toggle button */}
          <ThemeToggle />
          
          <button 
            className={styles.menuButton} 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.menuIcon}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  // Direct DOM manipulation approach for theme toggling
  const toggleTheme = () => {
    // Get the current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    // Toggle the theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Apply the new theme to the document
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    console.log(`Theme toggled from ${currentTheme} to ${newTheme}`);
  };
  
  // Determine current theme for rendering the correct icon
  const currentTheme = typeof document !== 'undefined' 
    ? document.documentElement.getAttribute('data-theme') || 'light'
    : 'light';
  
  return (
    <button 
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? (
        // Moon icon for dark mode
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ) : (
        // Sun icon for light mode
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
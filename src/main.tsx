import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply theme before React renders
const initializeTheme = () => {
  // Check local storage for stored theme
  const storedTheme = localStorage.getItem('theme');
  
  // Check for preferred system theme if no theme is stored
  if (!storedTheme && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    // Apply stored theme or default to light
    document.documentElement.setAttribute('data-theme', storedTheme === 'dark' ? 'dark' : 'light');
  }
};

// Initialize theme right away
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

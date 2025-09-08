import React, { useState, useRef, useEffect } from 'react';
import styles from './InteractiveText.module.css';

const InteractiveText: React.FC = () => {
  // Function to get responsive default font size
  const getDefaultFontSize = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 48 : 24; // 48px for desktop, 24px for mobile
    }
    return 24; // fallback for SSR
  };

  const [fontSize, setFontSize] = useState(getDefaultFontSize);
  const [fontColor, setFontColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Helvetica'];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Shuffle functionality
  const originalText = "I'm Liam, a designer and developer.";
  const [displayText, setDisplayText] = useState(originalText);
  const [shuffledText, setShuffledText] = useState('');
  const [isShuffled, setIsShuffled] = useState(false);

  const getThumbPosition = () => {
    if (!sliderRef.current) return '0%';
    const value = fontSize;
    const min = 12;
    const max = 48;
    const percentage = ((value - min) / (max - min)) * 100;
    // Adjust for thumb width to keep it within slider bounds
    const thumbWidth = Math.max(18, fontSize / 1.8);
    const sliderWidth = 120; // matches our sliderContainer width
    const maxOffset = (thumbWidth / sliderWidth) * 100;
    // Allow more extension to the right for better visual balance
    const adjustedPercentage = Math.max(maxOffset/2, Math.min(100 - maxOffset/3, percentage));
    return `${adjustedPercentage}%`;
  };

  // Shuffle function
  const shuffleText = (text: string) => {
    const chars = text.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  };

  const handleShuffleToggle = () => {
    if (!isShuffled) {
      // Shuffle the text
      const shuffled = shuffleText(originalText);
      setShuffledText(shuffled);
      setDisplayText(shuffled);
      setIsShuffled(true);
    } else {
      // Undo - restore original text
      setDisplayText(originalText);
      setIsShuffled(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle responsive font sizing
  useEffect(() => {
    const handleResize = () => {
      const newDefaultSize = getDefaultFontSize();
      // Only update if the current fontSize is still at the default for the current screen size
      const previousDefault = window.innerWidth >= 768 ? 24 : 48;

      // Only auto-adjust if user hasn't manually changed from the default
      if (fontSize === previousDefault) {
        setFontSize(newDefaultSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fontSize]);  const handleFontSelect = (font: string) => {
    setSelectedFont(font);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.text} ${isAnimating ? styles.wave : ''}`}
        style={{ fontSize: `${fontSize}px`, color: fontColor, fontFamily: selectedFont }}
      >
        {displayText.split('').map((char: string, index: number) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Updated controls as a condensed toolbar */}
      <div className={styles.controls}>
        {/* Font Size with Custom Slider */}
        <div className={styles.tool} title="Font Size">
          <div className={styles.sliderContainer}>
            <input
              ref={sliderRef}
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className={styles.slider}
            />
            <div
              className={styles.sliderThumb}
              style={{
                left: getThumbPosition(),
                fontSize: `${Math.max(10, fontSize / 2.2)}px`,
                width: `${Math.max(18, fontSize / 1.8)}px`,
                height: `${Math.max(18, fontSize / 1.8)}px`
              }}
            >
              Aa
            </div>
          </div>
          <span className={styles.value}>{fontSize}px</span>
        </div>

        {/* Font Color */}
        <div className={styles.tool} title="Font Color">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className={styles.colorPicker}
          />
        </div>

        {/* Custom Font Selection Dropdown */}
        <div className={styles.tool} title="Font Family" ref={dropdownRef}>
          <div className={styles.customSelect}>
            <div
              className={styles.selectTrigger}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ fontFamily: selectedFont }}
            >
              {selectedFont}
              <svg
                className={`${styles.arrow} ${isDropdownOpen ? styles.rotated : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {fonts.map(font => (
                  <div
                    key={font}
                    className={`${styles.option} ${selectedFont === font ? styles.selected : ''}`}
                    onClick={() => handleFontSelect(font)}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Animation Toggle */}
        <div className={styles.tool} title={isAnimating ? 'Stop Wave Animation' : 'Start Wave Animation'}>
          <img
            src="/wave-svgrepo-com.svg"
            alt="Wave Animation"
            className={styles.waveIcon}
            onClick={() => setIsAnimating(!isAnimating)}
            style={{
              cursor: 'pointer',
              width: '20px',
              height: '16px',
              filter: isAnimating ? 'brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(7461%) hue-rotate(207deg) brightness(101%) contrast(101%)' : 'brightness(0) saturate(100%) invert(37%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(60%) contrast(100%)'
            }}
          />
        </div>

        {/* Shuffle Toggle */}
        <div className={styles.tool} title={isShuffled ? 'Undo Shuffle' : 'Shuffle Letters'}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isShuffled ? "#007bff" : "#666"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.shuffleIcon}
            onClick={handleShuffleToggle}
            style={{ cursor: 'pointer' }}
          >
            {isShuffled ? (
              // Undo icon (arrow pointing left)
              <path d="M3 7v6h6M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
            ) : (
              // Shuffle icon (arrows crossing)
              <>
                <path d="M16 3h5v5M4 20L21 3"/>
                <path d="M21 16v5h-5M15 15l6 6"/>
                <path d="M4 4l5 5"/>
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InteractiveText;

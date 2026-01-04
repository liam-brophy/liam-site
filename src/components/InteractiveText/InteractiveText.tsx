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
  // When empty, the hero uses the theme color (via CSS variable). If the user picks a color, that overrides the theme.
  const [fontColor, setFontColor] = useState<string>('');
  const [themeColor, setThemeColor] = useState<string>('#000000');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Helvetica'];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Track mobile breakpoint so we can adjust text and layout
  const [isMobile, setIsMobile] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shuffle functionality
  // On mobile we show a line-break after "I'm Liam" per the design request
  // Use the same visible name on both mobile and desktop (I'm Liam,)
  const originalText = isMobile ? "I'm Liam,\na designer and developer." : "I'm Liam, a designer and developer.";
  const [displayText, setDisplayText] = useState(originalText);
  const [isShuffled, setIsShuffled] = useState(false);

  // When breakpoint changes, restore the non-shuffled text
  useEffect(() => {
    if (!isShuffled) setDisplayText(originalText);
  }, [isMobile]);

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
      setDisplayText(shuffled);
      setIsShuffled(true);
    } else {
      // Undo - restore original text
      setDisplayText(originalText);
      setIsShuffled(false);
    }
  };

  // Close dropdown when clicking outside (use pointer events to avoid click ordering races)
  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () => document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, []);

  // Sync an accessible theme-derived color for the color input so it reflects theme changes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const computeThemeColor = () => {
      const v = getComputedStyle(root).getPropertyValue('--interactive-text-color').trim();
      // ensure a fallback hex is present
      setThemeColor(v || '#000000');
    };

    computeThemeColor();

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          computeThemeColor();
        }
      }
    });

    obs.observe(root, { attributes: true });
    return () => obs.disconnect();
  }, []);

  // Handle responsive font sizing
  useEffect(() => {
    const handleResize = () => {
      const newDefaultSize = getDefaultFontSize();
      // Only update if the current fontSize is still at the default for the previous screen size
      // newDefaultSize corresponds to the NEW size for the CURRENT width, so previous default is the opposite
      const previousDefault = newDefaultSize === 48 ? 24 : 48;

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
        style={{ fontSize: `${fontSize}px`, color: fontColor || 'var(--interactive-text-color)', fontFamily: selectedFont }}
      >
        {displayText.split('').map((char: string, index: number) => (
          // Render newline as a break to create the mobile two-line hero
          char === '\n' ? <br key={`br-${index}`} /> : (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        ))}
      </div>

      {/* Updated controls as a condensed toolbar */}
      <div className={styles.controls}>
        <div className={`${styles.toolbarRow} ${styles.rowTop}`}>
        {/* Font Size with Custom Slider */}
        <div className={`${styles.tool} ${styles.sizeTool}`} title="Font Size">
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
        <div className={`${styles.tool} ${styles.colorTool}`} title="Font Color">
          <input
            type="color"
            value={fontColor || themeColor}
            onChange={(e) => setFontColor(e.target.value)}
            className={styles.colorPicker}
          />
        </div>
      </div>

      <div className={`${styles.toolbarRow} ${styles.rowBottom}`}>
        {/* Custom Font Selection Dropdown */}
        <div className={`${styles.tool} ${styles.fontTool}`} title="Font Family" ref={dropdownRef}>
          <div className={styles.customSelect}>
            <div
              className={styles.selectTrigger}
              onPointerDown={(e) => e.stopPropagation()}
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
                    onPointerDown={(e) => e.stopPropagation()}
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
        <div className={`${styles.tool} ${styles.motionTool}`} title={isAnimating ? 'Stop Wave Animation' : 'Start Wave Animation'}>
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
        <div className={`${styles.tool} ${styles.motionTool}`} title={isShuffled ? 'Undo Shuffle' : 'Shuffle Letters'}>
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
    </div>
  );
};

export default InteractiveText;

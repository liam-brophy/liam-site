/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "April 13, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Truncate a string to a specified length and add ellipsis if needed
 * @param str - String to truncate
 * @param length - Maximum length of the returned string
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * Convert a string to URL-friendly slug
 * @param str - String to convert
 * @returns URL-friendly slug
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Get a random item from an array
 * @param array - Array to get a random item from
 * @returns Random item from the array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Delay execution for a specified time
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Animates the favicon by cycling through a list of image URLs.
 * Assumes frame images are accessible via the provided URLs (e.g., in the public folder).
 * @param frameUrls - An array of URLs for the favicon frames.
 * @param intervalMs - The time interval between frame changes in milliseconds.
 * @returns A cleanup function to stop the animation.
 */
export const animateFavicon = (frameUrls: string[], intervalMs: number): (() => void) => {
  if (!frameUrls || frameUrls.length === 0) {
    console.error("No frame URLs provided for favicon animation.");
    return () => {}; // Return an empty cleanup function
  }

  let linkElement = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

  // If the link element doesn't exist, try creating one and appending it
  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.rel = 'icon';
    // Set initial favicon to the first frame
    linkElement.href = frameUrls[0];
    document.head.appendChild(linkElement);
    console.warn("Favicon link element not found, created a new one.");
  }

  // Store the original favicon href to potentially restore it later
  const originalFavicon = linkElement.href;
  let currentFrameIndex = 0;

  const intervalId = setInterval(() => {
    if (linkElement) { // Check if linkElement is still valid
      linkElement.href = frameUrls[currentFrameIndex];
      currentFrameIndex = (currentFrameIndex + 1) % frameUrls.length;
    } else {
      // Attempt to find the element again if it was removed
      linkElement = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
      if (!linkElement) {
        console.error("Favicon link element lost during animation.");
        clearInterval(intervalId); // Stop if element is permanently gone
      }
    }
  }, intervalMs);

  // Return a cleanup function
  return () => {
    clearInterval(intervalId);
    // Optional: Restore the original favicon when cleaning up
    const currentLinkElement = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (currentLinkElement) {
       currentLinkElement.href = originalFavicon; // Restore original or a default
    }
  };
};
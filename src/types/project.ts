export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string; // Optional static image
  imageLight?: string; // Optional light theme image
  imageDark?: string; // Optional dark theme image
  imageFrames?: string[]; // Optional array of frames for animation
  videoSrc?: string; // Optional video source path
  projectImages?: string[]; // Optional array of images for the project page
  link: string;
  external?: boolean; // Optional flag for external links
  animationInterval?: number; // Optional animation speed
  longAnimationInterval?: number; // Optional animation speed for first/last frames
  tags?: string[]; // Optional tags
  date?: string; // Optional project completion date
  category?: 'design' | 'development' | 'Content Management'; // Updated to include Content Management
  // Add any other project properties you might need
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  summary: string;
  imagePath: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
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
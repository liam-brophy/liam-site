# Portfolio Website Documentation

Hi! <3 This document provides an overview of the portfolio website structure, components, and how to customize it for your needs.

## Project Overview

This is a modern, responsive portfolio website built with React, TypeScript, and CSS Modules. It features:

- Responsive design that works on mobile and desktop
- Component-based architecture for easy maintenance
- TypeScript for type safety
- CSS Modules for scoped styling
- React Router for navigation

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/          # Button component with multiple variants
│   ├── Card/            # Card component for displaying projects
│   └── Navbar/          # Navigation bar with mobile responsive menu
├── pages/               # Main application pages
│   ├── Home/            # Landing page with hero and featured projects
│   ├── Work/            # Portfolio projects showcase
│   ├── About/           # About me page with bio and skills
│   └── Contact/         # Contact form and additional contact info
├── styles/              # Global styles
│   ├── index.css        # Global styles and resets
│   └── variables.css    # CSS variables for theming
├── types/               # TypeScript types and interfaces
│   └── project.ts       # Types for project data
├── utils/               # Utility functions
│   └── helpers.ts       # Reusable helper functions
├── App.tsx              # Root component with routing
└── main.tsx             # Entry point
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'text'
- `size`: 'small' | 'medium' | 'large'
- `fullWidth`: boolean
- All standard button HTML attributes

**Usage:**
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Card

A card component for displaying projects or content blocks.

**Props:**
- `title`: string
- `description`: string
- `link`: string (optional)
- `image`: string (optional)
- `tags`: string[] (optional)

**Usage:**
```tsx
<Card 
  title="Project Title"
  description="Project description"
  link="/work/project-1"
  image="/path/to/image.jpg"
  tags={["React", "TypeScript"]}
/>
```

### Navbar

A responsive navigation bar with mobile menu.

**Usage:**
```tsx
<Navbar />
```

## Pages

### Home

The Home page features a clean, minimal design with the following elements:

#### Aesthetic & Design

- **Clean and Minimal**: Implements an uncluttered, modern aesthetic
- **Full Width Layout**: The page extends to the full width of the browser window
- **Color Palette**: Uses off-white background (#F8F9FA) and black text (#212529) for high contrast and readability
- **Typography**: Employs Inter, a modern sans-serif font, with clear hierarchy between headings and body text

#### Structure

1. **Hero Section**:
   - Bold, centered design with your name and profession
   - Large, impactful typography with proper spacing
   - Subtle "Scroll to explore" indicator with animation
   - Takes up the full viewport height minus the navbar

2. **Projects Section**:
   - Bold project display that avoids traditional card-based layouts
   - Each project appears with a fade-in animation when scrolled into view
   - Projects are displayed in a vertically stacked layout with ample spacing
   - Project links feature subtle hover animations
   - Project tags use minimal styling with light background

#### Technical Implementation

- **Animation**: 
   - Uses the Intersection Observer API to trigger fade-in animations
   - Implements subtle animations for interactive elements
   - Includes a bounce animation for the scroll indicator

- **Responsive Design**:
   - Fully responsive layout that works on all screen sizes
   - Typography uses clamp() for fluid font sizing
   - Adjusted spacing and layout for mobile views

- **Accessibility**:
   - Semantic HTML structure
   - Proper color contrast
   - Support for keyboard navigation
   - ARIA attributes for interactive elements
   - Respects user preferences for reduced motion

#### CSS Structure

The Home page uses CSS Modules with the following key style elements:

```css
// Key style elements (not comprehensive):
.hero {
  // Full-height hero section with centered content
}

.project {
  // Initially hidden, animated into view when scrolled to
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.project.visible {
  // Visible state after animation
  opacity: 1;
  transform: translateY(0);
}

// Animation definitions for scroll indicator and project reveal
```

### Work

Portfolio page that displays a grid of projects.

### About

About page with bio, skills, and resume download.

### Contact

Contact page with a form and additional contact information.

## Styling

The project uses CSS Modules for component-specific styles and global CSS variables for theming.

### CSS Variables

Key design tokens are defined in `src/styles/variables.css`:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Layout dimensions

To change the theme, modify the values in this file.

## Data Model

The project data model is defined in `src/types/project.ts`:

```typescript
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
```

## Utility Functions

The `src/utils/helpers.ts` file contains useful functions:

- `formatDate`: Format a date string
- `truncateString`: Truncate long text with ellipsis
- `slugify`: Convert text to URL-friendly format
- `getRandomItem`: Select a random item from an array
- `delay`: Create a delay for animations or operations

## Customization

### Adding a New Page

1. Create a new folder in `src/pages/`
2. Add component and module CSS files
3. Update the router in `App.tsx`

### Adding Projects

Update the projects array in the Work component with your project data.

### Changing Colors and Theme

Modify the CSS variables in `src/styles/variables.css`.

## Running the Project

- Development: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Dependencies

- React
- React Router DOM
- TypeScript
- Vite (for building and development)

## Browser Support

This project supports all modern browsers. For IE11 support, additional polyfills may be required.
/**
 * Portfolio data for the MCP server to respond with
 * This data is structured according to the sections described in the PRD
 */

export const portfolioData = {
  projects: [
    {
      id: 1,
      title: "Full-Stack Application 1",
      description: "A comprehensive web application showcasing front and back-end skills",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://project1.example.com",
      githubUrl: "https://github.com/username/project1",
      designProcess: {
        phases: ["Research", "Wireframing", "Prototyping", "Development", "Testing"],
        highlights: "This project followed a user-centric design approach focusing on accessibility"
      },
      projectType: "web_app",
      featured: true,
      imageUrl: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "Design Report",
      description: "Brand identity system and style guide for a tech startup",
      technologies: ["Adobe Creative Suite", "Figma", "InDesign"],
      liveUrl: "https://project2.example.com",
      designProcess: {
        phases: ["Client Research", "Brand Positioning", "Visual Identity", "Implementation"],
        highlights: "Created a coherent brand identity that increased recognition by 40%"
      },
      projectType: "design",
      featured: true,
      imageUrl: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "Interactive Data Visualization",
      description: "Dynamic visualization of complex datasets using D3.js",
      technologies: ["D3.js", "React", "TypeScript", "CSV Processing"],
      liveUrl: "https://project3.example.com",
      githubUrl: "https://github.com/username/project3",
      projectType: "web_app",
      featured: false,
      imageUrl: "/images/project3.jpg"
    }
  ],

  laboratory: [
    {
      id: 1,
      title: "AI Text Generation Experiment",
      description: "An interactive experiment showcasing GPT model capabilities with custom inputs",
      technologies: ["React", "OpenAI API", "CSS Animations"],
      liveUrl: "https://lab1.example.com",
      githubUrl: "https://github.com/username/lab1",
      projectType: "experiment",
      imageUrl: "/images/lab1.gif"
    },
    {
      id: 2,
      title: "Interactive Physics Simulation",
      description: "A WebGL-based simulation demonstrating basic physics concepts",
      technologies: ["Three.js", "WebGL", "JavaScript"],
      liveUrl: "https://lab2.example.com",
      githubUrl: "https://github.com/username/lab2",
      projectType: "experiment",
      imageUrl: "/images/lab2.gif"
    }
  ],

  about: {
    intro: "I'm a full-stack developer and designer passionate about creating seamless digital experiences.",
    background: "With over 5 years of experience in web development and design, I've worked with startups and established companies to build digital products that solve real problems.",
    skills: [
      {
        category: "Frontend",
        technologies: ["React", "Vue", "TypeScript", "CSS/SASS", "HTML5"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"]
      },
      {
        category: "Design",
        technologies: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "InDesign"]
      }
    ],
    education: [
      {
        degree: "BS in Computer Science",
        institution: "University of Technology",
        year: "2018"
      },
      {
        degree: "Certificate in UX Design",
        institution: "Design Academy",
        year: "2019"
      }
    ],
    philosophy: "I believe in creating technology that enhances human experiences while remaining accessible and inclusive. Every project is an opportunity to merge form and function into something meaningful."
  },

  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    socialProfiles: [
      {
        platform: "GitHub",
        url: "https://github.com/username"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/username"
      },
      {
        platform: "Dribbble",
        url: "https://dribbble.com/username"
      }
    ],
    availableFor: ["Full-time positions", "Freelance projects", "Consulting", "Speaking engagements"]
  }
};
import { Project } from '../types/project'; // Assuming you have a Project type defined

export const projects: Project[] = [
  {
    id: 1,
    title: 'Artifact', // Added title
    description: 'Discover and collect works from artists around the world.',
    // Define base image paths, theme logic will be handled in the component
    imageDark: '/Project_thumbnails/Artifact_Logo_White.png',
    imageLight: '/Project_thumbnails/Artifact_Logo_Black.png',
    videoSrc: '/project_videos/artifact_demo.mp4', // Added video source
    projectImages: ['/project_images/artifact/img1.png', '/project_images/artifact/img2.png'], // Added project images
    link: 'https://www.artifact.online',
    external: true,
    tags: ['React', 'Node.js', 'Database Design', 'UI/UX Design', 'TypeScript'], // Updated tags
    date: '2025', // Updated date
    category: 'development' // Added category
  },
  {
    id: 2,
    title: 'Primer', // Added title
    description: 'A  magazine that hands you a drink, introduces you to new people, and engages you in bold conversations and fascinating stories.',
    // Define base image paths, theme logic will be handled in the component
    imageDark: '/Project_thumbnails/Primer_Logo_White.png',
    imageLight: '/Project_thumbnails/Primer_Logo_Black.png',
    videoSrc: '/project_videos/primer_demo.mp4', // Added video source
    projectImages: ['/project_images/primer/img1.png', '/project_images/primer/img2.png'], // Added project images
    link: 'https://www.primer.press',
    external: true,
    tags: ['React', 'UI/UX Design', 'TypeScript'], // Updated tags
    date: '2025', // Updated date
    category: 'development' // Added category
  },
  {
    id: 3,
    title: 'Storied',
    description: 'Collaborate on stories with your friends and editors, get feedback on your writing, and share your work.',
    image: '/path/to/image3.jpg', // Keep single image if no theme variation
    projectImages: ['/project_images/storied/img1.png', '/project_images/storied/img2.png'], // Added project images
    link: '/work/project3',
    tags: ['React Native', 'Database Design', 'UI/UX Design'], // Updated tags
    date: '2025', // Updated date
    category: 'development' // Added category
  },
  {
    id: 4,
    title: 'GoCA',
    description: 'Gallery of Contemporary Art digital platform for exhibitions and artist showcases.',
    // Define base image paths, theme logic will be handled in the component
    imageDark: '/Project_thumbnails/GoCA_Secondary-Lockup_light.png',
    imageLight: '/Project_thumbnails/GoCA_Secondary-Lockup_dark.png',
    projectImages: ['/project_images/goca/img1.png', '/project_images/goca/img2.png'],
    link: 'https://www.goca.org',
    external: true,
    tags: ['React', 'TypeScript', 'UI/UX Design', 'Gallery Management'],
    date: '2025',
    category: 'Content Management'
  },
  {
    id: 5,
    title: 'Editorial Design',
    description: 'Covers, interiors, and report design work for various publications.',
    imageFrames: [
      '/editorial/editorial_frame-01.png',
      '/editorial/editorial_frame-02.png',
      '/editorial/editorial_frame-03.png',
      '/editorial/editorial_frame-04.png',
      '/editorial/editorial_frame-05.png',
      '/editorial/editorial_frame-06.png',
      '/editorial/editorial_frame-07.png',
      '/editorial/editorial_frame-08.png',
      '/editorial/editorial_frame-09.png',
      '/editorial/editorial_frame-10.png',
      '/editorial/editorial_frame-11.png',
      '/editorial/editorial_frame-12.png',
      '/editorial/editorial_frame-13.png',
      '/editorial/editorial_frame-14.png',
      '/editorial/editorial_frame-15.png',
      '/editorial/editorial_frame-016.png',
    ],
    projectImages: ['/project_images/editorial/img1.png', '/project_images/editorial/img2.png'], // Added project images
    link: '/work/project4',
    animationInterval: 100,
    longAnimationInterval: 1500,
    tags: ['UI/UX Design', 'HTML/CSS'], // Updated tags
    date: '2024', // Updated date
    category: 'design' // Added category
  },
  {
    id: 6,
    title: "Children's Books",
    description: 'Children\'s book design work for various publications.',
    imageFrames: [
      '/childrens/Childrens_frames-01.png',
      '/childrens/Childrens_frames-02.png',
      '/childrens/Childrens_frames-03.png',
      '/childrens/Childrens_frames-04.png',
      '/childrens/Childrens_frames-05.png',
      '/childrens/Childrens_frames-06.png',
      '/childrens/Childrens_frames-07.png',
      '/childrens/Childrens_frames-08.png',
    ],
    projectImages: ['/project_images/childrens/img1.png', '/project_images/childrens/img2.png'], // Added project images
    link: '/work/project5',
    animationInterval: 100,
    longAnimationInterval: 1500,
    tags: ['UI/UX Design'], // Updated tags
    date: '2024', // Updated date
    category: 'design' // Added category
  }
];

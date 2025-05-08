import { Project } from '../types/project'; // Assuming you have a Project type defined

export const projects: Project[] = [
  {
    id: 1,
    title: 'Artifact', // Added title
    description: 'Share and collect artworks on a platform designed for discovery.',
    // Define base image paths, theme logic will be handled in the component
    imageDark: '/Project_thumbnails/Artifact_Logo_White.png',
    imageLight: '/Project_thumbnails/Artifact_Logo_Black.png',
    videoSrc: '/project_videos/artifact_demo.mp4', // Added video source
    projectImages: ['/project_images/artifact/img1.png', '/project_images/artifact/img2.png'], // Added project images
    link: 'https://www.artifact.online',
    external: true,
    tags: ['React', 'Node.js', 'Database Design', 'UI/UX Design'], // Removed TypeScript
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
    tags: ['React', 'UI/UX Design', 'Editorial'], // Removed TypeScript, added Editorial
    date: '2025', // Updated date
    category: 'development' // Added category
  },
  {
    id: 3,
    title: 'Storied',
    description: 'Collaborate on stories with your friends and editors, get feedback on your writing, and share your work.',
    imageDark: '/Project_thumbnails/Storied_Logo_White.png',
    imageLight: '/Project_thumbnails/Storied_Logo_Black.png',
    wip: '/WIP_liamsite.png', // Added WIP image reference
    projectImages: ['/project_images/storied/img1.png', '/project_images/storied/img2.png'],
    link: '/work/project/3',
    tags: ['React Native', 'Database Design', 'UI/UX Design'],
    date: '2025',
    category: 'development',
    hidden: true // Flag to hide this project from navigation
  },
  {
    id: 4,
    title: 'GoCA',
    description: 'Content Management and asset design for Garde\'s Gallery of Contemporary Art',
    // Define base image paths, theme logic will be handled in the component
    imageDark: '/Project_thumbnails/GoCA_Secondary-Lockup_light.png',
    imageLight: '/Project_thumbnails/GoCA_Secondary-Lockup_dark.png',
    projectImages: ['/project_images/goca/img1.png', '/project_images/goca/img2.png'],
    link: 'https://www.goca.gallery',
    external: true,
    tags: ['React', 'TypeScript', 'UI/UX Design', 'Gallery Management'],
    date: '2025',
    category: 'Content Management'
  },
  {
    id: 5,
    title: 'Editorial Design',
    description: 'Covers, interiors, and report design work.',
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
    projectImages: ['/project_images/editorial/img1.png', '/project_images/editorial/img2.png'],
    // Add editorial work images similar to children's book images
    editorialWorkImages: [
      '/editorial-work/AtlanticCouncil/AC_1.jpg',
      '/editorial-work/AtlanticCouncil/AC_2.jpg',
      '/editorial-work/AtlanticCouncil/AC_3.jpg',
      '/editorial-work/AtlanticCouncil/AC_5.jpg',
      '/editorial-work/AtlanticCouncil/AC_6.jpg',
      '/editorial-work/AtlanticCouncil/AC_7.jpg',
      '/editorial-work/AtlanticCouncil/AC_8.jpg',
      '/editorial-work/AtlanticCouncil/AC_10.jpg',
      '/editorial-work/Covers/AManual_v1.png',
      '/editorial-work/Covers/BrainOn_HRCover.jpg',
      '/editorial-work/Covers/ChildrenOfTime3.jpg',
      '/editorial-work/Covers/HealingPowerofLaughter_HR (1).jpg',
      '/editorial-work/Covers/WheretheShadowsDance_HRCover.jpg',
    ],
    link: '/work/project/5',
    animationInterval: 100,
    longAnimationInterval: 1500,
    tags: ['UI/UX Design', 'Publication Design', 'Editorial Design'],
    date: '2024',
    category: 'design'
  },
  {
    id: 6,
    title: "Children's Books",
    description: 'Children\'s book design work.',
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
    projectImages: ['/project_images/childrens/img1.png', '/project_images/childrens/img2.png'],
    // Add a new property for the children's book carousel images
    childrensBookImages: [
      '/childrens-work/AmysCoat_3D (1).png',
      '/childrens-work/BentleysDayOut_3D+copy (1).png',
      '/childrens-work/Bull&Bear_3D+copy (1).png',
      '/childrens-work/CockaDoodleDont_3D+copy (1).png',
      '/childrens-work/DaisyDoesn\'tDockDive_3D+copy.png',
      '/childrens-work/Hay_3D+copy (1).png',
      '/childrens-work/HearofGold_3D+copy (1).png',
      '/childrens-work/HomeThatLoveBuilt_3D (1).png',
      '/childrens-work/Iam_SelfDiscovery_3D+copy (1).png',
      '/childrens-work/IsYourDoctor_3D+copy.png',
      '/childrens-work/IzzyandRubes_3D+copy (1).png',
      '/childrens-work/JulieO\'Day_FrontCover_3D+copy.png',
      '/childrens-work/JustUs3_3D+copy (1).png',
      '/childrens-work/LifeofaGothicBaby_3D+copy (1).png',
      '/childrens-work/LittleToad_3D+copy (1).png',
      '/childrens-work/OtistheTrashTalkingOctopus_3D.png',
      '/childrens-work/WilliamEntemann_3D (1).png',
      '/childrens-work/WorldsNextGreatestBook_3D (1).png'
    ],
    link: '/work/project/6',
    animationInterval: 100,
    longAnimationInterval: 1500,
    tags: ['UI/UX Design', 'Book Design', 'Children\'s Literature'], // Updated tags
    date: '2024',
    category: 'design'
  }
];

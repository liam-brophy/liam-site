import { Project } from '../types/project'; // Assuming you have a Project type defined

export const projects: Project[] = [
  {
    id: 2,
    title: 'Primer',
    description: 'A magazine that hands you a drink, introduces you to new people, and engages you in bold conversations and fascinating stories.',
    imageDark: '/Project_thumbnails/Primer_Logo_White.png',
    imageLight: '/Project_thumbnails/Primer_Logo_Black.png',
    videoSrc: '/project_videos/primer_demo.mp4',
    projectImages: ['/project_images/primer/img1.png', '/project_images/primer/img2.png'],
    link: 'https://www.primer.press',
    external: true,
    tags: ['React', 'UI/UX Design', 'Editorial'],
    date: '2025',
    category: 'development'
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
    editorialWorkImages: [
      '/editorial-work/Screenshot 2025-08-17 at 3.22.54 PM.png',
      '/editorial-work/Screenshot 2025-08-17 at 3.23.28 PM.png',
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
    description: "Children's book design work.",
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
    childrensBookImages: [
      '/childrens-work/AmysCoat_3D (1).png',
      '/childrens-work/BentleysDayOut_3D+copy (1).png',
      '/childrens-work/Bull&Bear_3D+copy (1).png',
      '/childrens-work/CockaDoodleDont_3D+copy (1).png',
      "/childrens-work/DaisyDoesn'tDockDive_3D+copy.png",
      '/childrens-work/Hay_3D+copy (1).png',
      '/childrens-work/HearofGold_3D+copy (1).png',
      '/childrens-work/HomeThatLoveBuilt_3D (1).png',
      '/childrens-work/Iam_SelfDiscovery_3D+copy (1).png',
      '/childrens-work/IsYourDoctor_3D+copy.png',
      '/childrens-work/IzzyandRubes_3D+copy (1).png',
      "/childrens-work/JulieO'Day_FrontCover_3D+copy.png",
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
    tags: ["UI/UX Design", "Book Design", "Children's Literature"],
    date: '2024',
    category: 'design'
  },
  {
    id: 7,
    title: 'Hortus',
    description: 'A marketplace for ethical AI selection and responsible technology choices.',
    imageDark: '/hortus/Hortus_LogoLight.png',
    imageLight: '/hortus/Hortus_logoDark.png',
    projectImages: ['/project_images/hortus/img1.png', '/project_images/hortus/img2.png'],
    hortusImages: [
      '/hortus/HortusTrelis-Home.png',
      '/hortus/HortusTrellis-Marketplace.png',
      '/hortus/HortusTrellis-User Dashboard.png',  
      '/hortus/HortusTrellis-Vendor Modal.png'
    ],
    // New Hortus work examples
    hortusWorkExamples: [
      '/hortus/WorkExample1.png',
      '/hortus/WorkExample2.png',
      '/hortus/WorkExample3.png'
    ],
    // User journey assets
    hortusUserJourney: [
      '/hortus/Hortus-userJourney.png',
      '/hortus/Hortus-userJourney2.png'
    ],
    // Video content
    hortusVideo: '/hortus/Hortus-userJourney3.mov',
    link: '/work/project/7',
    animationInterval: 100,
    longAnimationInterval: 1500,
    tags: ['UI/UX Design', 'Product Design', 'Mobile App'],
    date: '2025',
    category: 'design'
  },
  {
    id: 1,
    title: 'Artifact',
    description: 'Share and collect artworks on a platform designed for discovery.',
    imageDark: '/Project_thumbnails/Artifact_Logo_White.png',
    imageLight: '/Project_thumbnails/Artifact_Logo_Black.png',
    videoSrc: '/project_videos/artifact_demo.mp4',
    projectImages: ['/project_images/artifact/img1.png', '/project_images/artifact/img2.png'],
    link: 'https://www.artifact.online',
    external: true,
    tags: ['React', 'Node.js', 'Database Design', 'UI/UX Design'],
    date: '2025',
    category: 'development'
  },
  {
    id: 3,
    title: 'Storied',
    description: 'Collaborate on stories with your friends and editors, get feedback on your writing, and share your work.',
    imageDark: '/Project_thumbnails/Storied_Logo_White.png',
    imageLight: '/Project_thumbnails/Storied_Logo_Black.png',
    wip: '/WIP_liamsite.png',
    projectImages: ['/project_images/storied/img1.png', '/project_images/storied/img2.png'],
    link: '/work/project/3',
    tags: ['React Native', 'Database Design', 'UI/UX Design'],
    date: '2025',
    category: 'development',
    hidden: true
  },
  {
    id: 4,
    title: 'GoCA',
    description: 'Content Management and asset design for Garde\'s Gallery of Contemporary Art',
    imageDark: '/Project_thumbnails/GoCA_Secondary-Lockup_light.png',
    imageLight: '/Project_thumbnails/GoCA_Secondary-Lockup_dark.png',
    projectImages: ['/project_images/goca/img1.png', '/project_images/goca/img2.png'],
    link: 'https://www.goca.gallery',
    external: true,
    tags: ['React', 'TypeScript', 'UI/UX Design', 'Gallery Management'],
    date: '2025',
    category: 'Content Management'
  }
];

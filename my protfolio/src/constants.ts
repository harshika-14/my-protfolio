import { Project, Experience, Achievement } from './types';
import smartGardeningImage from './smart gard.png';
import firefightingImage from './firefighting.jpeg';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Smart Gardening using iot',
    description: 'IoT-based solution using IR sensors and ESP8266 for real-time parking detection.',
    longDescription: 'An innovative IoT solution designed to solve urban parking issues. Using IR sensors and ESP8266 microcontrollers, the system detects parking spot availability in real-time and transmits data to a central dashboard for users to find spots easily.',
    image: smartGardeningImage,
    tags: ['IoT', 'ESP8266', 'IR Sensors', 'Automation'],
    link: 'https://github.com/harshika-14/Smart_Gardening',
  },
  {
    id: '2',
    title: 'Firefighting Drone',
    description: 'AI-assisted drone prototype for detecting and suppressing fire hazards.',
    longDescription: 'A cutting-edge robotics project that combines AI with drone technology. The prototype is designed to autonomously patrol areas, detect fire hazards using thermal imaging and computer vision, and deploy suppression measures in early stages.',
    image: firefightingImage,
    tags: ['Robotics', 'AI', 'Python', 'Computer Vision'],
    link: 'https://github.com/harshika-14',
  },
 
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Freelance Graphic & Web Designer',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Designing and building professional websites and graphic campaigns for various clients, focusing on brand identity and modern UI/UX principles.',
  },
  {
    id: '2',
    role: 'Technical Lead',
    company: 'Hackblitz Hackathon',
    period: '2025',
    description: 'Oversaw design and web setup; ensured technical smoothness during the event. Recognized for outstanding contribution as Lead Designer.',
  },
  {
    id: '3',
    role: 'Lead Designer',
    company: 'ACM Student Chapter',
    period: '2025 - 2026',
    description: 'Designed posters, branding materials, and digital assets for technical events, maintaining a consistent visual language for the chapter.',
  },
  {
    id: '4',
    role: 'Secretary',
    company: 'NSS (National Service Scheme)',
    period: '2025 - present',
    description: 'Lead village camps and social initiatives, coordinated with local authorities, and managed volunteer teams for community impact.',
  },
];


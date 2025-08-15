export interface ProjectGalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  title: string;
  description: string;
  eta: string;
  progress: number;
  image: string;
  journalFile?: string;
  gallery?: ProjectGalleryImage[];
  comingSoon?: boolean;
  keyPoints: string[];
}

export const projects: Project[] = [
  {
    title: "Horizon Flight Computer Development",
    description: "Designing, soldering, and testing our very own avionics board from scratch.",
    eta: "Q3 2025",
    progress: 80,
    image: "https://www.horizonavionics.org/horizonlogo.svg",
    journalFile: "horizon.txt",
    gallery: [
      {
        src: "/projects/galleries/horizon/board.jpg",
        alt: "Flight Computer Board",
        width: 800,
        height: 600
      },
      {
        src: "/projects/galleries/horizon/assembly.jpg",
        alt: "Assembly Process",
        width: 800,
        height: 600
      },
      {
        src: "/projects/galleries/horizon/testing.jpg",
        alt: "Testing Setup",
        width: 800,
        height: 600
      }
    ],
    keyPoints: [
      "Advanced telemetry system with real-time data transmission",
      "Target altitude: ~7,000 feet",
      "Working thrust vector control system",
      "Basic recovery system"
    ]
  },
  {
    title: "Project Fluid",
    description: "Making our first ever liquid engine rocket",
    eta: "Q2 2026",
    progress: 1,
    image: "/logo.png",
    journalFile: "fluid.txt",
    gallery: [
      {
        src: "/projects/galleries/fluid/design.jpg",
        alt: "Engine Design",
        width: 800,
        height: 600
      },
      {
        src: "/projects/galleries/fluid/prototype.jpg",
        alt: "First Prototype",
        width: 800,
        height: 600
      },
      {
        src: "/projects/galleries/fluid/testing.jpg",
        alt: "Test Setup",
        width: 800,
        height: 600
      }
    ],
    keyPoints: [
      "Custom liquid propellant motor design",
      "Basic Liquid Propellant Thrust Vector Control",
      "Advanced recovery system"
    ]
  },
  {
    title: "Project End Game",
    description: "Launching a custom propulsion system in our rocket",
    eta: "Q3 2026",
    progress: 1,
    image: "/logo.png",
    journalFile: "endgame.txt",
    comingSoon: true,
    keyPoints: [
      "Custom liquid propellant motor design",
      "Thrust vector control system",
      "Fully designed avionics package",
      "Custom auto-landing system"
    ]
  }
];

'use client';

import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface ProjectsProps {
  title: string;
  description: string;
  projects: Project[];
}

export default function Projects({ title, description, projects }: ProjectsProps) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
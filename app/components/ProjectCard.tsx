'use client';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectProps) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
} 
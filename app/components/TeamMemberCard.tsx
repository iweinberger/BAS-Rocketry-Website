'use client';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

export default function TeamMemberCard({ name, role, description, image }: TeamMemberProps) {
  return (
    <div className="team-member">
      <div className="member-image">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p className="description">{description}</p>
    </div>
  );
} 
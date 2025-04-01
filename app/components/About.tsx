'use client';

import Statistics from './Statistics';
import { faRocket, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';

interface AboutProps {
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
    icon: any;
  }[];
}

export default function About({ title, description, stats }: AboutProps) {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Statistics
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface StatProps {
  icon: IconDefinition;
  value: string;
  label: string;
}

export default function Statistics({ icon, value, label }: StatProps) {
  return (
    <div className="stat">
      <FontAwesomeIcon icon={icon} />
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
} 
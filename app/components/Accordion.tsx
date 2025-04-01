'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="accordion-item">
          <button
            className={`accordion-header ${
              openItems.includes(item.id) ? 'active' : ''
            }`}
            onClick={() => toggleItem(item.id)}
            aria-expanded={openItems.includes(item.id)}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="accordion-title">{item.title}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`accordion-icon ${
                openItems.includes(item.id) ? 'rotate' : ''
              }`}
            />
          </button>
          <div
            id={`accordion-content-${item.id}`}
            className={`accordion-content ${
              openItems.includes(item.id) ? 'active' : ''
            }`}
            role="region"
            aria-labelledby={`accordion-header-${item.id}`}
            hidden={!openItems.includes(item.id)}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
} 
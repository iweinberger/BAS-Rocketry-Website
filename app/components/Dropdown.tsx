'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}
      <div className="dropdown-container">
        <button
          className={`dropdown-button ${isOpen ? 'active' : ''} ${
            error ? 'error' : ''
          } ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="dropdown-selected">
            {selectedOption ? (
              <>
                {selectedOption.icon}
                {selectedOption.label}
              </>
            ) : (
              placeholder
            )}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`dropdown-icon ${isOpen ? 'rotate' : ''}`}
          />
        </button>
        {isOpen && (
          <div
            className="dropdown-menu"
            role="listbox"
            aria-label={label || 'Dropdown options'}
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`dropdown-option ${
                  value === option.value ? 'selected' : ''
                }`}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option.value}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="dropdown-error">{error}</span>}
    </div>
  );
} 
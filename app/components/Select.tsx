'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  multiple = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    value ? (multiple ? value.split(',') : [value]) : []
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange(newValues.join(','));
    } else {
      setSelectedValues([optionValue]);
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  const displayValue = multiple
    ? selectedLabels.length > 0
      ? `${selectedLabels.length} selected`
      : placeholder
    : selectedLabels[0] || placeholder;

  return (
    <div className={`select-container ${className}`} ref={selectRef}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <div
        className={`select-wrapper ${isOpen ? 'open' : ''} ${
          error ? 'error' : ''
        } ${disabled ? 'disabled' : ''}`}
      >
        <button
          type="button"
          className="select-button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="select-value">{displayValue}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`select-icon ${isOpen ? 'rotate' : ''}`}
          />
        </button>
        {isOpen && (
          <div
            className="select-dropdown"
            role="listbox"
            aria-multiselectable={multiple}
            aria-label={label || 'Select options'}
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`select-option ${
                  selectedValues.includes(option.value) ? 'selected' : ''
                } ${option.disabled ? 'disabled' : ''}`}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                disabled={option.disabled}
                role="option"
                aria-selected={selectedValues.includes(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <span id={`error-${label}`} className="select-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
} 
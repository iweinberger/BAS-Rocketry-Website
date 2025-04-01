'use client';

import { useState, useRef, useEffect } from 'react';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  autoResize?: boolean;
  className?: string;
}

export default function Textarea({
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  minLength,
  maxLength,
  rows = 3,
  autoResize = true,
  className = '',
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const adjustHeight = () => {
    if (!autoResize || !textareaRef.current) return;

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className={`textarea-container ${className}`}>
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <div
        className={`textarea-wrapper ${isFocused ? 'focused' : ''} ${
          error ? 'error' : ''
        }`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          rows={rows}
          className="textarea-field"
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
      </div>
      {error && (
        <span id={`error-${label}`} className="textarea-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
} 
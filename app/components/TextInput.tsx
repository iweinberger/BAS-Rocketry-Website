'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
}

export default function TextInput({
  value,
  onChange,
  type = 'text',
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  minLength,
  maxLength,
  pattern,
  className = '',
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`text-input ${className}`}>
      {label && (
        <label className="text-input-label">
          {label}
          {required && <span className="text-input-required">*</span>}
        </label>
      )}
      <div
        className={`text-input-container ${isFocused ? 'focused' : ''} ${
          error ? 'error' : ''
        }`}
      >
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          className="text-input-field"
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
        {type === 'password' && (
          <button
            type="button"
            className="text-input-password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-input-password-icon"
            />
          </button>
        )}
      </div>
      {error && (
        <span id={`error-${label}`} className="text-input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
} 
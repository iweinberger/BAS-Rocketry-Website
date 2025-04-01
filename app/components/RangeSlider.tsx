'use client';

import { useState, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  label?: string;
  error?: string;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
}

export default function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  error,
  disabled = false,
  showValue = true,
  className = '',
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const calculateBackground = () => {
    const percentage = ((localValue - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--primary-color) ${percentage}%, var(--light-gray) ${percentage}%)`;
  };

  return (
    <div className={`range-slider-container ${className}`}>
      {label && (
        <label className="range-slider-label">
          {label}
          {showValue && (
            <span className="range-slider-value">{localValue}</span>
          )}
        </label>
      )}
      <div
        className={`range-slider-wrapper ${error ? 'error' : ''} ${
          disabled ? 'disabled' : ''
        }`}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className="range-slider-input"
          style={{ background: calculateBackground() }}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValue}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
      </div>
      {error && (
        <span id={`error-${label}`} className="range-slider-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
} 
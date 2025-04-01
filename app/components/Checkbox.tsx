'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className = '',
}: CheckboxProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <button
        className={`checkbox ${checked ? 'checked' : ''} ${
          indeterminate ? 'indeterminate' : ''
        } ${disabled ? 'disabled' : ''}`}
        onClick={handleChange}
        disabled={disabled}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-label={label || 'Checkbox'}
      >
        {checked && !indeterminate && (
          <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
        )}
        {indeterminate && <span className="checkbox-indeterminate" />}
      </button>
      {label && (
        <label
          className={`checkbox-label ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && handleChange()}
        >
          {label}
        </label>
      )}
    </div>
  );
} 
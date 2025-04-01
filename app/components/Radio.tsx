'use client';

interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export default function Radio({
  checked,
  onChange,
  label,
  disabled = false,
  name,
  value,
  className = '',
}: RadioProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(true);
    }
  };

  return (
    <div className={`radio-container ${className}`}>
      <button
        className={`radio ${checked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={handleChange}
        disabled={disabled}
        role="radio"
        aria-checked={checked}
        aria-label={label || 'Radio button'}
        name={name}
        value={value}
      >
        {checked && <span className="radio-dot" />}
      </button>
      {label && (
        <label
          className={`radio-label ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && handleChange()}
        >
          {label}
        </label>
      )}
    </div>
  );
} 
'use client';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'medium',
  className = '',
}: SwitchProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`switch-container ${className}`}>
      <button
        className={`switch ${size} ${checked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle switch'}
      >
        <span className="switch-track" />
        <span className="switch-thumb" />
      </button>
      {label && (
        <label
          className={`switch-label ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && handleToggle()}
        >
          {label}
        </label>
      )}
    </div>
  );
} 
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
  faUpload,
  faTimes,
  faSearch,
  faCheck,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Common interfaces
interface BaseProps {
  className?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// Icon Component
interface IconProps {
  icon: IconDefinition;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  color?: string;
}

export function Icon({ icon, className = '', size = '1x', color }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`icon icon-${size} ${className}`}
      style={color ? { color } : undefined}
    />
  );
}

// Button Component
interface ButtonProps extends BaseProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    outline: 'button-outline',
  };
  const sizeClasses = {
    small: 'button-small',
    medium: 'button-medium',
    large: 'button-large',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

// Input Components
interface TextInputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export function TextInput({
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
            <Icon
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

// DatePicker Component
interface DatePickerProps extends BaseProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select a date',
  error,
  disabled = false,
  required = false,
  minDate,
  maxDate,
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [inputValue, setInputValue] = useState(
    value ? value.toLocaleDateString() : ''
  );
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleDateString());
      setCurrentMonth(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const parsedDate = new Date(newValue);
    if (!isNaN(parsedDate.getTime())) {
      onChange(parsedDate);
    }
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = value && date.toDateString() === value.toDateString();
      const isDisabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${
            isDisabled ? 'disabled' : ''
          }`}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`date-picker-container ${className}`} ref={pickerRef}>
      {label && (
        <label className="date-picker-label">
          {label}
          {required && <span className="date-picker-required">*</span>}
        </label>
      )}
      <div
        className={`date-picker-wrapper ${isOpen ? 'open' : ''} ${
          error ? 'error' : ''
        } ${disabled ? 'disabled' : ''}`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="date-picker-input"
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
        <button
          type="button"
          className="date-picker-button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <Icon icon={faCalendar} className="date-picker-icon" />
        </button>
        {isOpen && (
          <div
            className="date-picker-popup"
            role="dialog"
            aria-label="Date picker"
          >
            <div className="calendar-header">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                disabled={minDate && currentMonth <= minDate}
              >
                <Icon icon={faChevronLeft} />
              </button>
              <span className="calendar-month">
                {currentMonth.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                disabled={maxDate && currentMonth >= maxDate}
              >
                <Icon icon={faChevronRight} />
              </button>
            </div>
            <div className="calendar-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-days">{renderCalendarDays()}</div>
          </div>
        )}
      </div>
      {error && (
        <span id={`error-${label}`} className="date-picker-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// Alert Component
interface AlertProps extends BaseProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Alert({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const icons = {
    info: faInfoCircle,
    success: faCheckCircle,
    warning: faExclamationTriangle,
    error: faTimesCircle,
  };

  if (!isVisible) return null;

  return (
    <div className={`alert alert-${type} ${className}`} role="alert">
      <Icon icon={icons[type]} className="alert-icon" />
      <div className="alert-content">
        {title && <h3 className="alert-title">{title}</h3>}
        <p className="alert-message">{message}</p>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
}

// Modal Component
interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'medium',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className={`modal modal-${size} ${className}`}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

// FileInput Component
interface FileInputProps extends BaseProps {
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export function FileInput({
  onChange,
  accept,
  multiple = false,
  maxSize,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
}: FileInputProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!disabled) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    if (maxSize) {
      const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        alert(`Some files exceed the maximum size of ${maxSize / 1024 / 1024}MB`);
        return;
      }
    }

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`file-input-container ${className}`}>
      {label && (
        <label className="file-input-label">
          {label}
          {required && <span className="file-input-required">*</span>}
        </label>
      )}
      <div
        className={`file-input-wrapper ${dragActive ? 'drag-active' : ''} ${
          error ? 'error' : ''
        } ${disabled ? 'disabled' : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          required={required}
          className="file-input-field"
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
        <div className="file-input-content">
          <Icon icon={faUpload} className="file-input-icon" />
          <p className="file-input-text">
            Drag and drop files here, or click to select files
          </p>
          {accept && (
            <p className="file-input-accept">
              Accepted files: {accept}
            </p>
          )}
        </div>
      </div>
      {files.length > 0 && (
        <div className="file-input-list">
          {files.map((file, index) => (
            <div key={index} className="file-input-item">
              <span className="file-input-name">{file.name}</span>
              <span className="file-input-size">
                {formatFileSize(file.size)}
              </span>
              <button
                type="button"
                className="file-input-remove"
                onClick={() => removeFile(index)}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
              >
                <Icon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && (
        <span id={`error-${label}`} className="file-input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// SearchInput Component
interface SearchInputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  label,
  error,
  className = '',
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`search-input ${className}`}>
      {label && <label className="search-label">{label}</label>}
      <div
        className={`search-container ${isFocused ? 'focused' : ''} ${
          error ? 'error' : ''
        }`}
      >
        <Icon icon={faSearch} className="search-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-field"
          aria-label={label || 'Search input'}
        />
        {value && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <Icon icon={faTimes} />
          </button>
        )}
      </div>
      {error && <span className="search-error">{error}</span>}
    </div>
  );
} 
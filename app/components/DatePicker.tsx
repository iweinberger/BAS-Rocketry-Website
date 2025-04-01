'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export default function DatePicker({
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Add days of the month
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
          <FontAwesomeIcon icon={faCalendar} className="date-picker-icon" />
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
                <FontAwesomeIcon icon={faChevronLeft} />
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
                <FontAwesomeIcon icon={faChevronRight} />
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
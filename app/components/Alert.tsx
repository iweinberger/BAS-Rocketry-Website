'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';
import { faInfoCircle, faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  className?: string;
}

export default function Alert({
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
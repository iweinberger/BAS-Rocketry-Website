'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

interface FileInputProps {
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FileInput({
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
          <FontAwesomeIcon icon={faUpload} className="file-input-icon" />
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
                <FontAwesomeIcon icon={faTimes} />
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
import React, { useRef, useState } from 'react';
import { Upload, File, Check, X } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({
  id,
  label,
  onChange,
  error,
  required = false,
  accept = '.pdf,.jpg,.jpeg,.png'
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onChange(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onChange(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload-container">
      <label 
        htmlFor={id} 
        className="file-upload-label"
      >
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      
      {!selectedFile ? (
        <div
          className={`
            file-drop-area
            ${isDragging ? 'dragging' : ''}
            ${error ? 'error-state' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="upload-icon" />
          <p className="upload-text">
            <span className="upload-action">Click to upload</span> or drag and drop
          </p>
          <p className="file-types">PDF, PNG, JPG or JPEG (max. 10MB)</p>
        </div>
      ) : (
        <div className="file-preview">
          <File className="file-icon" />
          <div className="file-info">
            <p className="file-name">
              {selectedFile.name}
            </p>
            <p className="file-size">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className="remove-button"
          >
            <X className="remove-icon" />
          </button>
        </div>
      )}
      
      <input
        id={id}
        name={id}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="file-input"
        aria-invalid={error ? 'true' : 'false'}
      />
      
      {error && (
        <p className="error-message" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
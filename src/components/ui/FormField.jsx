import React from 'react';
import './FormField.css';

const FormField = ({
  label,
  id,
  type = 'text',
  error,
  required = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="form-field">
      <label 
        htmlFor={id} 
        className="form-label"
      >
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      
      {children || (
        <input
          id={id}
          name={id}
          type={type}
          className={`
            form-input
            ${error ? 'input-error' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
      )}
      
      {error && (
        <p className="error-message" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;

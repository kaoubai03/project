import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const widthClass = fullWidth ? 'button-full-width' : '';
  const disabledClass = (disabled || isLoading) ? 'button-disabled' : '';
  
  return (
    <button
      className={`
        button-base
        ${variantClass}
        ${sizeClass}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="button-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && !isLoading && <span className="button-icon">{icon}</span>}
      
      {children}
    </button>
  );
};

export default Button;
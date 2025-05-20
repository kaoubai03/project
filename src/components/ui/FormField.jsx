import React from 'react';
import styles from './FormField.module.css';

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
    <div className={styles.formField}>
      <label 
        htmlFor={id} 
        className={styles.formLabel}
      >
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>
      
      {children || (
        <input
          id={id}
          name={id}
          type={type}
          className={`
            ${styles.formInput}
            ${error ? styles.inputError : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
      )}
      
      {error && (
        <p className={styles.errorMessage} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
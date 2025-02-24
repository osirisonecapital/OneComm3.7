import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  required = false,
  className = '',
  label,
  error,
  autoComplete = 'off',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  return (
    <div className="relative w-full">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-white/80 mb-1"
        >
          {label}
          {required && <span className="text-secondary-light ml-1">*</span>}
        </label>
      )}
      
      <motion.div
        className="relative"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          id={id || name}
          required={required}
          autoComplete={autoComplete}
          className={`input-field ${error ? 'border-secondary/70' : ''} ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {error && (
          <motion.p 
            className="mt-1 text-xs text-secondary-light"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Input; 
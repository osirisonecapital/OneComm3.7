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
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {label && (
        <motion.label 
          htmlFor={id || name} 
          className={`block text-sm font-medium mb-1 transition-colors duration-200 ${isFocused ? 'text-accent-light' : 'text-white/80'}`}
          animate={{ 
            x: isFocused ? 3 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-accent-light ml-1">*</span>}
        </motion.label>
      )}
      
      <motion.div
        className="relative"
        animate={{ 
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`absolute inset-0 rounded-xl transition-all duration-300 ${isFocused ? 'bg-accent/20 blur-md' : 'blur-none opacity-0'}`}
          layoutId={`input-glow-${name || id}`}
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          id={id || name}
          required={required}
          autoComplete={autoComplete}
          className={`input-field relative z-10 ${error ? 'border-secondary/70' : isFocused ? 'border-accent/70' : 'border-white/20'} ${className}`}
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
    </motion.div>
  );
};

export default Input; 
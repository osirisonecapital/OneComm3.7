import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  icon,
  fullWidth = false,
}) => {
  const baseClasses = 'flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'text-white',
    secondary: 'bg-background/60 backdrop-blur-sm text-gray-700 hover:bg-background-dark/50',
    outline: 'border-2 border-primary/50 text-primary hover:border-primary',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variant === 'primary' ? '' : variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
      whileHover={!disabled && !isLoading ? { 
        scale: 1.02,
        boxShadow: '0 0 15px rgba(142, 36, 170, 0.4)'
      } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      {/* Animated background for primary button */}
      {variant === 'primary' && (
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{ 
            background: [
              'linear-gradient(90deg, #8e24aa 0%, #d81b60 100%)',
              'linear-gradient(110deg, #d81b60 0%, #8e24aa 100%)',
              'linear-gradient(130deg, #8e24aa 0%, #d81b60 100%)',
              'linear-gradient(90deg, #8e24aa 0%, #d81b60 100%)'
            ],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear",
          }}
        />
      )}
      
      {/* Animated pulse effect on hover for primary button */}
      {variant === 'primary' && !disabled && !isLoading && (
        <motion.div 
          className="absolute inset-0 bg-white/15 rounded-xl opacity-0"
          initial={{ scale: 0.85, opacity: 0 }}
          whileHover={{ 
            scale: [0.85, 1.05, 0.85],
            opacity: [0, 1, 0],
            transition: { 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut" 
            }
          }}
        />
      )}
      
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
      
      {/* Highlight effect on hover */}
      {variant === 'primary' && !disabled && !isLoading && (
        <motion.div 
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.15 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default Button; 
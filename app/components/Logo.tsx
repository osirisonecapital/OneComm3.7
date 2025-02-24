import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary absolute"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-8 h-8 rounded-full border-2 border-primary-light absolute left-1 top-1"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
      </div>
      <motion.span 
        className={`font-display font-semibold ${sizes[size]} gradient-text`}
      >
        One Community
      </motion.span>
    </motion.div>
  );
};

export default Logo; 
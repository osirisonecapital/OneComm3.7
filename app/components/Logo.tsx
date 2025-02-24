import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showImages?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '',
  showImages = true
}) => {
  const sizes = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  const imageSize = {
    sm: 24,
    md: 32,
    lg: 40
  };

  return (
    <Link href="/" className={`flex items-center justify-center gap-3 ${className}`}>
      {showImages && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-md opacity-50"
            animate={{ 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            style={{ backgroundColor: 'rgba(156, 39, 176, 0.3)' }}
          />
          <Image 
            src="/images/logo.png" 
            alt="One Community Logo" 
            width={imageSize[size]} 
            height={imageSize[size]}
            className="relative z-10"
          />
        </motion.div>
      )}
      
      <motion.span 
        className={`font-display font-semibold ${sizes[size]} gradient-text`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.03 }}
      >
        One Community
      </motion.span>
      
      {showImages && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-md opacity-50"
            animate={{ 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1.5
            }}
            style={{ backgroundColor: 'rgba(233, 30, 99, 0.3)' }}
          />
          <Image 
            src="/images/logo.png" 
            alt="One Community Logo" 
            width={imageSize[size]} 
            height={imageSize[size]}
            className="relative z-10"
          />
        </motion.div>
      )}
    </Link>
  );
};

export default Logo; 
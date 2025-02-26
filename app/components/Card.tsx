import React, { useEffect, useState, useMemo } from 'react';
import { motion, Variants, TargetAndTransition, VariantLabels, AnimationControls } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: boolean | VariantLabels | TargetAndTransition;
  animate?: boolean | VariantLabels | TargetAndTransition | AnimationControls;
  exit?: VariantLabels | TargetAndTransition;
  transition?: object;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Card: React.FC<CardProps> = React.memo(({
  children,
  className = '',
  variants = defaultVariants,
  initial = 'hidden',
  animate = 'visible',
  exit = 'exit',
  transition = { duration: 0.5, ease: 'easeInOut' }
}) => {
  // Check if we're on a mobile device to optimize animations
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect mobile device based on screen width or user agent
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Memoize animation properties to prevent recreating on each render
  const backgroundAnimation = useMemo(() => ({
    background: [
      'radial-gradient(circle at 20% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
      'radial-gradient(circle at 80% 80%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
      'radial-gradient(circle at 20% 80%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
      'radial-gradient(circle at 80% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
      'radial-gradient(circle at 20% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
    ]
  }), []);

  // Memoize animation transition properties
  const backgroundTransition = useMemo(() => ({
    duration: isMobile ? 30 : 20, // Slower animation on mobile (less frame updates)
    repeat: Infinity, 
    ease: "linear",
    repeatType: "loop" as const
  }), [isMobile]);

  return (
    <motion.div
      className={`card relative overflow-hidden ${className}`}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={{ boxShadow: '0 8px 30px rgba(63, 81, 181, 0.3)' }}
      layout={false} // Prevent unnecessary layout calculations
    >
      {/* Subtle background animation - optimized for mobile */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.5 }}
        animate={isMobile ? {} : backgroundAnimation} // Disable complex animation on mobile
        transition={backgroundTransition}
        style={isMobile ? { 
          background: 'radial-gradient(circle at 50% 50%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 70%)',
          opacity: 0.5
        } : undefined}
      />
      
      {/* Border glow on hover - simplified for mobile */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none opacity-0"
        whileHover={{ 
          opacity: 1,
          borderColor: 'rgba(63, 81, 181, 0.3)',
          boxShadow: isMobile ? 'none' : 'inset 0 0 15px rgba(63, 81, 181, 0.2)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card; 
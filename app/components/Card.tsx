import React from 'react';
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

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variants = defaultVariants,
  initial = 'hidden',
  animate = 'visible',
  exit = 'exit',
  transition = { duration: 0.5, ease: 'easeInOut' }
}) => {
  return (
    <motion.div
      className={`card relative overflow-hidden ${className}`}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={{ boxShadow: '0 8px 30px rgba(35, 69, 57, 0.3)' }}
    >
      {/* Subtle background animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.5 }}
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
            'radial-gradient(circle at 80% 80%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
            'radial-gradient(circle at 20% 80%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
            'radial-gradient(circle at 80% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
            'radial-gradient(circle at 20% 20%, rgba(35, 69, 57, 0.12) 0%, rgba(25, 42, 86, 0) 50%)',
          ]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none opacity-0"
        whileHover={{ 
          opacity: 1,
          borderColor: 'rgba(35, 69, 57, 0.3)',
          boxShadow: 'inset 0 0 15px rgba(35, 69, 57, 0.2)' 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 
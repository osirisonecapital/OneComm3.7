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
      whileHover={{ boxShadow: '0 8px 30px rgba(142, 36, 170, 0.15)' }}
    >
      {/* Subtle background animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.2 }}
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 20%, rgba(216, 27, 96, 0.05) 0%, rgba(254, 242, 246, 0) 50%)',
            'radial-gradient(circle at 80% 80%, rgba(57, 73, 171, 0.05) 0%, rgba(240, 244, 255, 0) 50%)',
            'radial-gradient(circle at 20% 80%, rgba(216, 27, 96, 0.05) 0%, rgba(254, 242, 246, 0) 50%)',
            'radial-gradient(circle at 80% 20%, rgba(57, 73, 171, 0.05) 0%, rgba(240, 244, 255, 0) 50%)',
            'radial-gradient(circle at 20% 20%, rgba(216, 27, 96, 0.05) 0%, rgba(254, 242, 246, 0) 50%)',
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
          borderColor: 'rgba(142, 36, 170, 0.2)',
          boxShadow: 'inset 0 0 15px rgba(142, 36, 170, 0.05)' 
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
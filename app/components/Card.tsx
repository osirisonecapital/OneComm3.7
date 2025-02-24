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
      className={`card ${className}`}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Card; 
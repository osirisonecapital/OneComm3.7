import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface LoadingCardProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500); // Add slight delay after completion
          }
          return 100;
        }
        return newProgress;
      });
    }, duration / 100);
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);
  
  const loadingMessages = [
    "Analyzing your responses...",
    "Consulting ancient wisdom...",
    "Calculating your energy pattern...",
    "Almost there...",
  ];
  
  const currentMessageIndex = Math.min(
    Math.floor(progress / (100 / loadingMessages.length)),
    loadingMessages.length - 1
  );
  
  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <h3 className="text-xl font-medium text-white mb-8">Processing Results</h3>
      
      <div className="relative h-2 bg-background rounded-full overflow-hidden mb-6">
        <motion.div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="min-h-[3rem] flex items-center justify-center"
      >
        <p className="text-white/70">{loadingMessages[currentMessageIndex]}</p>
      </motion.div>
      
      <div className="mt-8 flex justify-center">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-3 h-3 mx-1 rounded-full bg-primary-light"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default LoadingCard; 
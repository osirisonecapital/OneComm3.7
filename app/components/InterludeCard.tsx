import React from 'react';
import { motion } from 'framer-motion';
import { Interlude } from '../utils/questionnaireData';
import Card from './Card';
import Button from './Button';

interface InterludeCardProps {
  interlude: Interlude;
  onContinue: () => void;
}

const InterludeCard: React.FC<InterludeCardProps> = ({ interlude, onContinue }) => {
  const { text, statistic } = interlude;
  
  return (
    <Card 
      className="w-full max-w-md mx-auto text-center"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
      }}
    >
      {statistic && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-4xl md:text-5xl font-bold gradient-text">{statistic}</span>
        </motion.div>
      )}
      
      <motion.p 
        className="text-lg text-white/90 italic mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        "{text}"
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Button onClick={onContinue} fullWidth>
          Continue
        </Button>
      </motion.div>
    </Card>
  );
};

export default InterludeCard; 
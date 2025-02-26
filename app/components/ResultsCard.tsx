import React from 'react';
import { motion } from 'framer-motion';
import { EnergyType } from '../utils/questionnaireData';
import Card from './Card';

interface ResultsCardProps {
  energyType: EnergyType;
  nameVibration: {
    number: number;
    description: string;
  };
  name: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ 
  energyType, 
  nameVibration, 
  name 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Card 
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
          Your Results Are Ready, {name}!
        </h2>
        <p className="text-white/70">
          Based on your responses, we've analyzed your energy pattern and name vibration.
        </p>
      </motion.div>
      
      {/* Energy Type Section */}
      <motion.div className="mb-10" variants={itemVariants}>
        <h3 className="text-xl font-semibold text-primary-light mb-4">
          Energy Type: <span className="text-white">{energyType.name}</span>
        </h3>
        
        <p className="text-white/80 mb-6">
          {energyType.description}
        </p>
        
        <div className="bg-background/50 rounded-xl p-4 mb-6">
          <h4 className="text-white font-medium mb-2">Key Characteristics:</h4>
          <ul className="space-y-2">
            {energyType.characteristics.map((trait, index) => (
              <motion.li 
                key={index} 
                className="flex items-center text-white/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <span className="text-primary-light mr-2">•</span> {trait}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="bg-background/50 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Recommendations:</h4>
          <ul className="space-y-2">
            {energyType.recommendations.map((rec, index) => (
              <motion.li 
                key={index} 
                className="flex items-center text-white/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
              >
                <span className="text-secondary-light mr-2">•</span> {rec}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      {/* Name Vibration Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-secondary-light mb-4">
          Name Vibration: <span className="text-white">Number {nameVibration.number}</span>
        </h3>
        
        <div className="flex justify-center mb-4">
          <motion.div 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-secondary"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 rgba(233, 30, 99, 0.4)',
                '0 0 20px rgba(233, 30, 99, 0.6)',
                '0 0 0 rgba(233, 30, 99, 0.4)'
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-3xl font-bold text-white">{nameVibration.number}</span>
          </motion.div>
        </div>
        
        <p className="text-white/80 text-center mb-6">
          {nameVibration.description}
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center text-white/60 text-sm"
        variants={itemVariants}
      >
        Want more insights? Join our community for personalized readings and guidance.
      </motion.div>
    </Card>
  );
};

export default ResultsCard; 
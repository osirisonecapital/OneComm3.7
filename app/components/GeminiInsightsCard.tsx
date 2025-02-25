import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';

interface GeminiInsight {
  nameVibration: {
    number: number;
    description: string;
  };
  energyType: {
    name: string;
    description: string;
  };
  insights: string[];
  message: string;
}

interface GeminiInsightsCardProps {
  insights?: GeminiInsight;
  isLoading: boolean;
  error?: string;
  onContinue: () => void;
}

const GeminiInsightsCard: React.FC<GeminiInsightsCardProps> = ({
  insights,
  isLoading,
  error,
  onContinue
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Card 
        className="w-full max-w-2xl mx-auto text-center p-8"
        variants={containerVariants}
      >
        <motion.h3 
          className="text-2xl font-semibold gradient-text mb-6"
          variants={itemVariants}
        >
          Generating Deeper Insights...
        </motion.h3>
        
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="relative w-24 h-24">
            <motion.div 
              className="absolute inset-0 rounded-full border-t-4 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border-t-4 border-secondary"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-4 rounded-full border-t-4 border-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        
        <motion.p 
          className="text-white/70 text-center mb-6"
          variants={itemVariants}
        >
          Our mystical algorithms are analyzing your energy pattern and crafting personalized spiritual guidance...
        </motion.p>
        
        <motion.p 
          className="text-sm text-white/50 italic"
          variants={itemVariants}
        >
          This usually takes less than 15 seconds
        </motion.p>
      </Card>
    );
  }

  // Handle error state
  if (error || !insights) {
    return (
      <Card 
        className="w-full max-w-2xl mx-auto p-8"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-secondary-light mb-4">
            Connection to the Spiritual Realm Interrupted
          </h3>
          <p className="text-white/70">
            We're unable to access the deeper insights at this moment. The cosmic energies may be fluctuating.
          </p>
        </motion.div>
        
        <motion.div className="mb-8" variants={itemVariants}>
          <p className="text-white/70 text-center">
            For the most accurate and comprehensive reading, consider our premium personalized analysis service.
          </p>
        </motion.div>
        
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Button onClick={onContinue}>
            Continue to Premium Options
          </Button>
        </motion.div>
      </Card>
    );
  }

  // Render insights when available
  return (
    <Card 
      className="w-full max-w-2xl mx-auto p-8"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h3 className="text-2xl font-semibold gradient-text mb-4">
          Your Deeper Spiritual Insights
        </h3>
        <p className="text-white/70">
          Based on your {insights.energyType.name} energy and Name Vibration {insights.nameVibration.number}, we've unlocked these personalized insights.
        </p>
      </motion.div>
      
      <motion.div className="mb-10" variants={itemVariants}>
        <div className="bg-background/30 rounded-xl p-6 mb-8 border border-primary/20">
          <h4 className="text-xl font-medium text-primary-light mb-4">Key Insights:</h4>
          <ul className="space-y-4">
            {insights.insights.map((insight, index) => (
              <motion.li 
                key={index} 
                className="flex items-start text-white/90"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.2) }}
              >
                <span className="text-primary-light mr-2 mt-1">✦</span> 
                <span>{insight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <motion.div 
          className="bg-background/30 rounded-xl p-6 border border-secondary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h4 className="text-xl font-medium text-secondary-light mb-4">Personal Message:</h4>
          <p className="text-white/90 italic">
            "{insights.message}"
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex justify-center"
        variants={itemVariants}
      >
        <Button onClick={onContinue}>
          Explore Premium Analysis
        </Button>
      </motion.div>
    </Card>
  );
};

export default GeminiInsightsCard; 
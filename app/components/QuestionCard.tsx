import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, QuestionOption } from '../utils/questionnaireData';
import Card from './Card';

interface QuestionCardProps {
  question: Question;
  onOptionSelect: (value: string) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onOptionSelect, 
  currentIndex, 
  totalQuestions 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    // Add a small delay before triggering the callback for visual feedback
    setTimeout(() => onOptionSelect(value), 300);
  };

  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3,
      },
    }),
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 0 0 2px rgba(63, 81, 181, 0.5)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-accent-light font-semibold">Q{currentIndex + 1}</span>
          <span className="text-white/60 text-sm ml-1">of {totalQuestions}</span>
        </div>
        <div className="bg-background h-2 rounded-full w-1/3 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent to-accent-light" 
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-white mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            className={`w-full p-4 rounded-xl bg-white/10 text-left text-white transition-all duration-200
              ${selectedOption === option.value ? 'border-accent border-2 bg-white/15' : 'border border-white/5 hover:border-accent/40'}
            `}
            onClick={() => handleOptionSelect(option.value)}
            variants={optionVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            whileHover={selectedOption !== option.value ? "hover" : {}}
            whileTap="tap"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard; 
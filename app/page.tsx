'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions, interludes, energyTypes } from './utils/questionnaireData';
import { calculateNameVibration } from './utils/nameVibration';

// Components
import Logo from './components/Logo';
import VideoBackground from './components/VideoBackground';
import Card from './components/Card';
import Input from './components/Input';
import Button from './components/Button';
import QuestionCard from './components/QuestionCard';
import InterludeCard from './components/InterludeCard';
import LoadingCard from './components/LoadingCard';
import ResultsCard from './components/ResultsCard';
import GeminiInsightsCard from './components/GeminiInsightsCard';
import Image from 'next/image';

// Define the different steps of the questionnaire flow
type Step = 
  | 'initial' 
  | 'question' 
  | 'interlude' 
  | 'loading' 
  | 'results'
  | 'gemini'
  | 'premium';

// Animated text component for key words
const AnimatedGradientText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.span 
    className="gradient-text inline-block"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.7, 
      delay, 
      ease: [0.14, 0.8, 0.4, 1] 
    }}
  >
    {children}
  </motion.span>
);

export default function Home() {
  // State for form values and flow control
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Questionnaire flow state
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingInterlude, setShowingInterlude] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Results
  const [dominantEnergyType, setDominantEnergyType] = useState('');
  const [nameVibration, setNameVibration] = useState({ number: 0, description: '' });
  
  // Gemini insights state
  const [geminiInsights, setGeminiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // Handle form submission on the initial screen
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Please enter your name');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!email.trim()) {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (isValid) {
      // Calculate name vibration
      setNameVibration(calculateNameVibration(name));
      
      // Move to first question
      setCurrentStep('question');
    }
  };

  // Handle option selection in a question
  const handleOptionSelect = (value: string) => {
    // Store the answer
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value
    }));
    
    // Check if we need to show an interlude after this question
    const interludeKey = `after-${questions[currentQuestionIndex].id}`;
    if (interludes[interludeKey]) {
      setShowingInterlude(interludeKey);
      setCurrentStep('interlude');
    } else {
      // Move to next question or results
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions answered, proceed to results
        setCurrentStep('loading');
      }
    }
  };

  // Handle continuing after an interlude
  const handleInterludeContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentStep('question');
    } else {
      // All questions answered, proceed to results
      setCurrentStep('loading');
    }
  };

  // Calculate the dominant energy type based on answers
  const calculateResults = () => {
    // Count occurrences of each energy type
    const counts: Record<string, number> = {
      water: 0,
      fire: 0,
      earth: 0,
      air: 0
    };
    
    // Go through all answers and increment counts
    Object.values(answers).forEach(type => {
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });
    
    // Find the dominant type
    let dominant = 'water'; // Default in case of a tie
    let maxCount = 0;
    
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        dominant = type;
        maxCount = count;
      }
    });
    
    setDominantEnergyType(dominant);
    setCurrentStep('results');
  };

  // Function to fetch deeper insights from Gemini
  const fetchGeminiInsights = async () => {
    setIsLoadingInsights(true);
    setInsightsError(null);
    setCurrentStep('gemini');
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          questionnaireResponses: answers,
          nameVibration,
          energyType: energyTypes[dominantEnergyType],
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }
      
      const data = await response.json();
      setGeminiInsights(data);
    } catch (error) {
      console.error('Error fetching Gemini insights:', error);
      setInsightsError('Failed to connect to the spiritual realm');
    } finally {
      setIsLoadingInsights(false);
    }
  };
  
  // Handle continuing to premium options
  const handleGoToPremium = () => {
    setCurrentStep('premium');
    // This would navigate to your premium offerings or upsell page
    // For now, we'll just redirect to a hypothetical upgrade page after 1 second
    setTimeout(() => {
      alert('This would navigate to your premium subscription page.');
      // In a real implementation, you might use router.push('/premium') 
      // or window.location.href = '/premium'
    }, 1000);
  };

  // Scroll to top when changing steps (for mobile experience)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, currentQuestionIndex]);

  return (
    <main className="min-h-screen relative">
      {/* Video Background */}
      <VideoBackground
        src="/videos/energy-background.mp4"
        fallbackImage="/images/fallback-bg.svg"
      />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <header className="py-4 flex justify-center">
          <Logo size="lg" className="mx-auto" />
        </header>
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col items-center justify-center py-8">
          <AnimatePresence mode="wait">
            {currentStep === 'initial' && (
              <motion.div 
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <motion.h1 
                    className="text-3xl md:text-4xl font-bold mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Discover Your{' '}
                    <AnimatedGradientText delay={0.3}>Energy Type</AnimatedGradientText>
                    <br /> and{' '}
                    <AnimatedGradientText delay={0.6}>Name Vibration</AnimatedGradientText>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-white/80 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    Join thousands discovering their true energetic potential through
                    <br className="hidden md:block" /> ancient wisdom and modern science.
                  </motion.p>
                </div>
                
                {/* Initial Form */}
                <Card>
                  <form onSubmit={handleInitialSubmit}>
                    <div className="space-y-4 mb-6">
                      <Input
                        label="Your First Name"
                        placeholder="Enter your first name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                        required
                      />
                      
                      <Input
                        type="email"
                        label="Your Email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        required
                      />
                    </div>
                    
                    <Button type="submit" fullWidth>
                      Discover Your Energy →
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}
            
            {currentStep === 'question' && (
              <motion.div 
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <QuestionCard
                  question={questions[currentQuestionIndex]}
                  onOptionSelect={handleOptionSelect}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                />
              </motion.div>
            )}
            
            {currentStep === 'interlude' && (
              <motion.div 
                key={`interlude-${showingInterlude}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <InterludeCard
                  interlude={interludes[showingInterlude]}
                  onContinue={handleInterludeContinue}
                />
              </motion.div>
            )}
            
            {currentStep === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <LoadingCard 
                  onComplete={calculateResults}
                  duration={4000}
                />
              </motion.div>
            )}
            
            {currentStep === 'results' && dominantEnergyType && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <ResultsCard
                  energyType={energyTypes[dominantEnergyType]}
                  nameVibration={nameVibration}
                  name={name}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.7 }}
                  className="mt-8 flex justify-center"
                >
                  <Button onClick={fetchGeminiInsights}>
                    Unlock Deeper Insights
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            {currentStep === 'gemini' && (
              <motion.div
                key="gemini"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <GeminiInsightsCard
                  insights={geminiInsights}
                  isLoading={isLoadingInsights}
                  error={insightsError || undefined}
                  onContinue={handleGoToPremium}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <footer className="py-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-3"
            >
              <Image 
                src="/images/logo.png" 
                alt="One Community Logo" 
                width={40} 
                height={40}
                className="mx-auto"
              />
            </motion.div>
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} One Community. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
} 
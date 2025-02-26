'use client';

import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions, interludes, energyTypes } from './utils/questionnaireData';
import { calculateNameVibration } from './utils/nameVibration';

// Components
import Logo from './components/Logo';
import { VideoBackground } from './components/VideoBackground';
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

// Animation text component - memoized for better performance
const AnimatedText = React.memo(({ children }: { children: React.ReactNode }) => (
  <motion.span
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      ease: [0.14, 0.8, 0.4, 1] 
    }}
  >
    {children}
  </motion.span>
));

AnimatedText.displayName = 'AnimatedText';

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
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  // Set up mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle form submission on the initial screen - memoized with useCallback
  const handleInitialSubmit = useCallback((e: React.FormEvent) => {
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
      // Calculate name vibration now
      const vibration = calculateNameVibration(name);
      setNameVibration(vibration);
      
      // Move to first question
      setCurrentStep('question');
    }
  }, [name, email]);

  // Handle option selection in a question - memoized with useCallback
  const handleOptionSelect = useCallback((value: string) => {
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
  }, [currentQuestionIndex]);

  // Handle continuing after an interlude - memoized with useCallback
  const handleInterludeContinue = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentStep('question');
    } else {
      // All questions answered, proceed to results
      setCurrentStep('loading');
    }
  }, [currentQuestionIndex]);

  // Calculate the dominant energy type based on answers - memoized with useCallback
  const calculateResults = useCallback(() => {
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
    
    // Find the energy type with the highest count
    let max = 0;
    let dominant = '';
    
    Object.entries(counts).forEach(([type, count]) => {
      if (count > max) {
        max = count;
        dominant = type;
      }
    });
    
    setDominantEnergyType(dominant);
    setCurrentStep('results');
  }, [answers]);

  // Fetch insights from Gemini API - memoized with useCallback
  const fetchGeminiInsights = useCallback(async () => {
    if (!dominantEnergyType || !name) return;
    
    setIsLoadingInsights(true);
    setInsightsError(null);
    
    try {
      // Simulating an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock response based on energy type
      const mockInsights = {
        water: {
          personality: "Your water energy reflects a deep emotional intuition and adaptability. You have a natural empathy and excel at understanding others' feelings.",
          strengths: ["Emotional intelligence", "Intuitive", "Adaptable", "Compassionate", "Reflective"],
          challenges: ["Can be overwhelmed by emotions", "May absorb others' negative energy", "Sometimes indecisive"],
          advice: "Channel your natural empathy into supportive relationships while maintaining emotional boundaries. Your intuition is your superpower."
        },
        fire: {
          personality: "Your fire energy manifests as passion, creativity, and dynamic drive. You naturally inspire others and bring enthusiasm to any situation.",
          strengths: ["Charismatic", "Energetic", "Creative", "Confident", "Self-motivated"],
          challenges: ["Can be impulsive", "May intimidate quieter personalities", "Risk of burnout"],
          advice: "Direct your passionate energy toward meaningful goals. Remember to balance action with reflection to sustain your inner fire."
        },
        earth: {
          personality: "Your earth energy shows through your practical reliability and grounded nature. You provide stability and can always be counted on.",
          strengths: ["Dependable", "Practical", "Patient", "Organized", "Persistent"],
          challenges: ["Can resist necessary change", "May seem stubborn", "Sometimes too focused on details"],
          advice: "Trust your natural ability to create structure and stability, while practicing flexibility when change is needed."
        },
        air: {
          personality: "Your air energy reflects your intellectual curiosity and communicative nature. You're constantly seeking knowledge and sharing ideas.",
          strengths: ["Analytical", "Communicative", "Objective", "Quick-thinking", "Versatile"],
          challenges: ["Can overthink situations", "May seem detached", "Sometimes scattered"],
          advice: "Use your intellectual gifts to connect ideas and people. Remember to ground your thoughts in practical application."
        }
      };
      
      // Return insights for the dominant energy type
      setGeminiInsights(mockInsights[dominantEnergyType as keyof typeof mockInsights]);
      setCurrentStep('gemini');
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsError('Unable to connect to Gemini API. Please try again later.');
    } finally {
      setIsLoadingInsights(false);
    }
  }, [dominantEnergyType, name]);
  
  // Handle continuing to premium options - memoized with useCallback
  const handleGoToPremium = useCallback(() => {
    setCurrentStep('premium');
    // This would navigate to your premium offerings or upsell page
    // For now, we'll just redirect to a hypothetical upgrade page after 1 second
    setTimeout(() => {
      alert('This would navigate to your premium subscription page.');
      // In a real implementation, you might use router.push('/premium') 
      // or window.location.href = '/premium'
    }, 1000);
  }, []);

  // Scroll to top when changing steps (for mobile experience)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, currentQuestionIndex]);

  // Memoize animation variants for better performance
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }), []);

  const questionVariants = useMemo(() => ({
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }), []);

  const interludeVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  }), []);

  return (
    <main className="min-h-screen relative">
      {/* Video Background */}
      <VideoBackground
        src="/videos/landing.mp4"
        mobileVideoSrc="/videos/landing-mobile.mp4"
        fallbackImageSrc="/images/fallback-bg.svg"
      />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <header className="py-4 flex justify-center">
          <Logo size="lg" className="mx-auto" />
        </header>
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col items-center justify-center py-8">
          <AnimatePresence 
            mode="wait" 
            initial={false} 
          >
            {currentStep === 'initial' && (
              <motion.div 
                key="initial"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ 
                  duration: isMobile ? 0.3 : 0.5,
                  ease: [0.14, 0.8, 0.4, 1] 
                }}
                className={`w-full max-w-md ${isMobile ? 'reduce-motion' : ''}`}
              >
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: isMobile ? 0.3 : 0.5 }}
                  >
                    Discover Your{' '}
                    <AnimatedText>Energy Type</AnimatedText>
                    <br /> and{' '}
                    <AnimatedText>Name Vibration</AnimatedText>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-xl text-white/80 backdrop-blur-sm bg-background-light/5 px-4 py-2 rounded-lg shadow-md" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Unlock the hidden dimensions of your true self
                  </motion.p>
                </div>
                
                {/* Start Form */}
                <Card>
                  <form onSubmit={handleInitialSubmit}>
                    <div className="mb-6">
                      <Input
                        label="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                      />
                    </div>
                    
                    <div className="mb-8">
                      <Input
                        label="Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                      />
                    </div>
                    
                    <Button type="submit" fullWidth>
                      Begin Journey
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}
            
            {currentStep === 'question' && (
              <motion.div 
                key={`question-${currentQuestionIndex}`}
                variants={questionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ 
                  duration: isMobile ? 0.3 : 0.5,
                  ease: [0.14, 0.8, 0.4, 1] 
                }}
                className={`w-full ${isMobile ? 'reduce-motion' : ''}`}
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
                variants={interludeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ 
                  duration: isMobile ? 0.3 : 0.5,
                  ease: [0.14, 0.8, 0.4, 1] 
                }}
                className={`w-full ${isMobile ? 'reduce-motion' : ''}`}
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
                transition={{ duration: isMobile ? 0.3 : 0.5 }}
                className={`w-full ${isMobile ? 'reduce-motion' : ''}`}
              >
                <LoadingCard 
                  onComplete={calculateResults}
                  duration={isMobile ? 3000 : 4000}
                />
              </motion.div>
            )}
            
            {currentStep === 'results' && dominantEnergyType && (
              <motion.div 
                key="results"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ 
                  duration: isMobile ? 0.3 : 0.7,
                  ease: [0.14, 0.8, 0.4, 1] 
                }}
                className={`w-full ${isMobile ? 'reduce-motion' : ''}`}
              >
                <ResultsCard
                  energyType={energyTypes[dominantEnergyType]}
                  nameVibration={nameVibration}
                  name={name}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: isMobile ? 0.5 : 1.5, 
                    duration: isMobile ? 0.3 : 0.7 
                  }}
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
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ 
                  duration: isMobile ? 0.3 : 0.7,
                  ease: [0.14, 0.8, 0.4, 1] 
                }}
                className={`w-full ${isMobile ? 'reduce-motion' : ''}`}
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
              whileHover={isMobile ? undefined : { scale: 1.05 }}
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
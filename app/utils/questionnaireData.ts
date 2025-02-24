export interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface Interlude {
  id: string;
  text: string;
  statistic?: string;
}

export interface EnergyType {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

// Questions for the questionnaire flow
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Is your energy flagging when you need it most?',
    options: [
      { id: 'q1-a', text: 'Yes, almost daily', value: 'water' },
      { id: 'q1-b', text: 'Sometimes, depending on stress', value: 'fire' },
      { id: 'q1-c', text: 'Rarely, I usually have stable energy', value: 'earth' },
      { id: 'q1-d', text: 'No, but I often feel scattered', value: 'air' }
    ]
  },
  {
    id: 'q2',
    text: 'Did you know Ayurveda has been enhancing energy and well-being for thousands of years?',
    options: [
      { id: 'q2-a', text: 'Yes, I\'ve practiced it before', value: 'earth' },
      { id: 'q2-b', text: 'I\'ve heard of it but know little', value: 'air' },
      { id: 'q2-c', text: 'No, but I\'m curious to learn', value: 'water' },
      { id: 'q2-d', text: 'I prefer modern solutions', value: 'fire' }
    ]
  },
  {
    id: 'q3',
    text: 'Imagine waking up feeling refreshed and energized every day. Would you like to experience that uplift?',
    options: [
      { id: 'q3-a', text: 'Absolutely, I need more energy', value: 'water' },
      { id: 'q3-b', text: 'Yes, especially mental clarity', value: 'air' },
      { id: 'q3-c', text: 'I want balanced, sustainable energy', value: 'earth' },
      { id: 'q3-d', text: 'I want intense, peak performance', value: 'fire' }
    ]
  }
];

// Interludes to display between questions
export const interludes: Record<string, Interlude> = {
  'after-q1': {
    id: 'interlude1',
    text: 'In fact, studies show nearly 40% of adults report persistent fatigue.',
    statistic: '40%'
  },
  'after-q2': {
    id: 'interlude2',
    text: 'Research shows Ayurvedic practices improve vitality in over 60% of regular practitioners.',
    statistic: '60%'
  },
  'after-q3': {
    id: 'interlude3',
    text: '90% of users report noticeable energy boosts within just 2 weeks.',
    statistic: '90%'
  }
};

// Energy types and their descriptions
export const energyTypes: Record<string, EnergyType> = {
  'water': {
    id: 'water',
    name: 'Water Type',
    description: 'You have deep, calm energy that flows like water. You are introspective, intuitive, and emotionally sensitive.',
    characteristics: [
      'Intuitive and empathetic',
      'Creative and imaginative',
      'Introspective and thoughtful',
      'Adaptable and flexible'
    ],
    recommendations: [
      'Practice grounding exercises to prevent feeling overwhelmed',
      'Incorporate warming foods and spices like ginger and cinnamon',
      'Maintain regular sleep patterns to stabilize your energy',
      'Engage in gentle, flowing movement like swimming or tai chi'
    ]
  },
  'fire': {
    id: 'fire',
    name: 'Fire Type',
    description: 'You have intense, transformative energy that burns like fire. You are passionate, driven, and naturally charismatic.',
    characteristics: [
      'Passionate and enthusiastic',
      'Driven and ambitious',
      'Charismatic and inspiring',
      'Transformative and powerful'
    ],
    recommendations: [
      'Balance intensity with cooling activities like meditation',
      'Include cooling foods like cucumbers and mint in your diet',
      'Take breaks to prevent burnout',
      'Channel energy through focused physical activities'
    ]
  },
  'earth': {
    id: 'earth',
    name: 'Earth Type',
    description: 'You have stable, nurturing energy that grounds like earth. You are reliable, practical, and naturally supportive.',
    characteristics: [
      'Stable and grounded',
      'Practical and reliable',
      'Nurturing and supportive',
      'Patient and persistent'
    ],
    recommendations: [
      'Incorporate variety to prevent stagnation',
      'Practice light, energizing activities to maintain mobility',
      'Include more bitter greens in your diet for stimulation',
      'Challenge yourself with new experiences regularly'
    ]
  },
  'air': {
    id: 'air',
    name: 'Air Type',
    description: 'You have quick, moving energy that flows like air. You are intellectual, communicative, and naturally creative.',
    characteristics: [
      'Quick-thinking and intellectual',
      'Communicative and expressive',
      'Adaptable and versatile',
      'Creative and innovative'
    ],
    recommendations: [
      'Establish routines to provide stability',
      'Practice grounding exercises like yoga',
      'Include warming, nourishing foods in your diet',
      'Engage in regular meditation to calm mental activity'
    ]
  }
}; 
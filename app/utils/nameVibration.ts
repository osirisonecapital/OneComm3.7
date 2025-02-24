/**
 * Calculates the Pythagorean name vibration number from a given name
 * Each letter is assigned a value (A=1, B=2, etc.) and the sum is reduced to a single digit
 * @param name - The name to calculate vibration for
 * @returns An object with vibration number and description
 */
export const calculateNameVibration = (name: string): { number: number; description: string } => {
  if (!name || name.trim() === '') {
    return { number: 0, description: 'Please enter your name to calculate your vibration' };
  }

  // Remove spaces, convert to uppercase
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  // Convert letters to numbers (A=1, B=2, etc)
  let total = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const letterValue = cleanName.charCodeAt(i) - 64; // A is 65 in ASCII, so A-64 = 1
    if (letterValue > 0 && letterValue <= 26) {
      total += letterValue;
    }
  }
  
  // Reduce to a single digit (except for master numbers 11, 22)
  while (total > 9 && total !== 11 && total !== 22) {
    total = Array.from(String(total), Number).reduce((a, b) => a + b, 0);
  }
  
  // Descriptions for each vibration number
  const descriptions: Record<number, string> = {
    0: 'Please enter your name to calculate your vibration',
    1: 'The Leader: Independent, original, self-sufficient, and ambitious',
    2: 'The Diplomat: Cooperative, adaptable, considerate of others, and sensitive',
    3: 'The Expressive: Creative, optimistic, inspiring, and joyful',
    4: 'The Builder: Practical, trustworthy, disciplined, and hardworking',
    5: 'The Freedom Seeker: Versatile, adventurous, progressive, and sensual',
    6: 'The Nurturer: Responsible, loving, protective, and healing',
    7: 'The Seeker: Analytical, introspective, perfectionist, and wisdom-oriented',
    8: 'The Achiever: Ambitious, goal-oriented, status-conscious, and powerful',
    9: 'The Humanitarian: Compassionate, generous, selfless, and idealistic',
    11: 'The Intuitive: Highly intuitive, idealistic, inspirational, and visionary',
    22: 'The Master Builder: Practical visionary, capable of manifesting grand ideas'
  };
  
  return {
    number: total,
    description: descriptions[total] || 'Unknown vibration'
  };
}; 
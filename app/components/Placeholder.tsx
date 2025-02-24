import React from 'react';

interface PlaceholderProps {
  text?: string;
  className?: string;
  width?: string;
  height?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  text = 'Placeholder',
  className = '',
  width = '100%',
  height = '100%'
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-background-light to-background-dark flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-white/60 text-center p-4">
        <div className="mb-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mx-auto opacity-50"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Placeholder; 
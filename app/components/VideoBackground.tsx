import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  fallbackImage?: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  fallbackImage = '/images/fallback-bg.svg',
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(true); // Force using fallback during debug

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsLoaded(true);
      };
      
      const handleError = () => {
        setIsError(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // For mobile devices, pause and play to overcome autoplay restrictions
      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch(() => {
            setIsError(true);
          });
        }
      };
      
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('click', handleUserInteraction, { once: true });
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!isError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`object-cover w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}
        >
          <source src={src} type="video/mp4" />
          {/* Fallback text for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}
      
      {/* Gradient Overlay for depth and softer contrast - increased opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-white/10 to-background-blue" />
      
      {/* Removed the white overlay that might be making everything white */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-[2px]" /> */}
    </div>
  );
};

export default VideoBackground; 
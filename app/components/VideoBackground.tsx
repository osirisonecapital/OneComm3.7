import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  mobileSrc?: string;
  fallbackImage?: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  mobileSrc,
  fallbackImage = '/images/fallback-bg.svg',
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on a mobile device based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Run on initial load
    checkMobile();

    // Add listener for window resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // Determine which source to use based on device
  const videoSource = mobileSrc && isMobile ? mobileSrc : src;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!isError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`object-cover w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={videoSource} type="video/mp4" />
          {/* Fallback text for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}
      
      {/* Gradient Overlay for depth and softer contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark/40 via-transparent to-background-light/20" />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background-dark bg-opacity-60 backdrop-blur-sm" />
    </div>
  );
};

export default VideoBackground; 
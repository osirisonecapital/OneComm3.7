'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

interface VideoBackgroundProps {
  src: string;
  mobileVideoSrc?: string;
  fallbackImageSrc: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  mobileVideoSrc,
  fallbackImageSrc,
}) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const attemptedPlay = useRef(false);

  // Memoize the video source based on device type
  const videoSrc = useMemo(() => {
    if (!hasWindow) return '';
    return isMobile && mobileVideoSrc ? mobileVideoSrc : src;
  }, [hasWindow, isMobile, mobileVideoSrc, src]);

  // Set up window detection and mobile detection
  useEffect(() => {
    setHasWindow(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video playback with error recovery
  useEffect(() => {
    if (!hasWindow || !videoRef.current || attemptedPlay.current) return;
    
    const playVideo = async () => {
      attemptedPlay.current = true;
      try {
        // Using lower playback quality on mobile for better performance
        if (videoRef.current) {
          if (isMobile) {
            videoRef.current.preload = 'metadata';
            videoRef.current.setAttribute('playsinline', '');
          } else {
            videoRef.current.preload = 'auto';
          }
          
          await videoRef.current.play();
          setIsVideoLoaded(true);
        }
      } catch (error) {
        console.log('Video autoplay failed:', error);
        // Fallback to showing the fallback image
        setIsVideoLoaded(false);
      }
    };
    
    // Small delay to ensure browser is ready for playback
    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, [hasWindow, isMobile]);
  
  // Handle visibility change to pause video when tab is inactive
  useEffect(() => {
    if (!hasWindow) return;
    
    const handleVisibilityChange = () => {
      if (!videoRef.current) return;
      
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Play on visibility change failed:', err));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hasWindow]);

  // Apply different styles for mobile vs desktop
  const videoClasses = useMemo(() => {
    const baseClasses = "absolute inset-0 w-full h-full object-cover";
    return `${baseClasses} ${isMobile ? 'scale-[1.02]' : 'scale-[1.01]'}`;
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      {hasWindow && (
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          className={videoClasses}
          poster={fallbackImageSrc}
          style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      
      {/* Fallback image and loading state handler */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isVideoLoaded ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
      >
        <Image
          src={fallbackImageSrc}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/80" />
    </div>
  );
}; 
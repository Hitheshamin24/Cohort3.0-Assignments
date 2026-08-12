import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);

  useGSAP(() => {
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (progress >= 100) {
      // The exit animation
      const tl = gsap.timeline();
      
      tl.to('.loader-text', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.2 
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          // Re-enable scrolling after preloader finishes
          document.body.style.overflow = 'auto';
          // Tell other components they can start their entry animations
          window.dispatchEvent(new CustomEvent('preloaderComplete'));
        }
      });
    }
  }, [progress]);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex items-end justify-end p-8 md:p-16"
    >
      <div className="loader-text text-[20vw] md:text-[12vw] font-heading font-black text-white leading-none overflow-hidden">
        {Math.min(progress, 100)}%
      </div>
    </div>
  );
};

export default Preloader;

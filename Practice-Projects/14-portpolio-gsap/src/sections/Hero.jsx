import React, { useRef, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Helper component to split text into characters for advanced GSAP staggering
const SplitText = ({ text }) => {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Entry Timeline
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Stagger characters in with blur and scale (very premium feel)
    tl.from('.char', {
      y: 100,
      opacity: 0,
      rotateX: -90,
      filter: 'blur(10px)',
      scale: 0.8,
      duration: 1.5,
      stagger: 0.02,
      delay: 0.1
    })
    
    // Draw the faint architectural line
    .from('.hero-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 2,
      ease: 'power3.inOut',
    }, '-=1.2')
    
    // Fade in supporting text smoothly
    .from('.hero-fade-up', {
      y: 20,
      opacity: 0,
      duration: 1.5,
      filter: 'blur(5px)',
    }, '-=1.2');

  }, { scope: heroRef });

  // Interactive Mouse Parallax & Glow Follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized coordinates (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      // 1. Move the background glow orb towards the cursor smoothly
      gsap.to(glowRef.current, {
        x: clientX - innerWidth / 2,
        y: clientY - innerHeight / 2,
        duration: 2,
        ease: 'power3.out'
      });

      // 2. Add subtle 3D parallax to the text itself
      gsap.to(textRef.current, {
        x: xPos * -30,
        y: yPos * -20,
        rotationY: xPos * 5,
        rotationX: yPos * -5,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]"
      style={{ perspective: '1000px' }} // needed for 3D rotation
    >
      
      {/* CSS Noise Overlay for cinematic texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Interactive Cursor Glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] bg-white/[0.04] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      ></div>

      {/* Subtle faint diagonal line */}
      <div className="hero-line absolute top-0 left-[60%] w-[1px] h-[120%] bg-gradient-to-b from-white/0 via-white/10 to-white/0 -rotate-[15deg] pointer-events-none"></div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        
        {/* Main Typography with 3D Parallax */}
        <div ref={textRef} className="transform-style-preserve-3d">
          <h1 className="text-[15vw] md:text-[11vw] leading-[0.85] font-heading font-bold tracking-tighter mb-8 uppercase text-white mix-blend-difference">
            <div className="overflow-hidden pb-2">
              <SplitText text="FULL STACK" />
            </div>
            <div className="overflow-hidden pb-2">
              <SplitText text="DEVELOPER" />
            </div>
          </h1>
        </div>

        {/* Supporting Text */}
        <div className="hero-fade-up flex flex-col items-center gap-4 max-w-xl mt-4">
          <p className="text-text-muted text-sm md:text-base font-sans font-light leading-relaxed">
            {personalInfo.tagline} {personalInfo.subTagline}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProjectImageGallery = ({ imgs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (imgs.length <= 2) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imgs.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [imgs.length]);

  useGSAP(() => {
    const images = gsap.utils.toArray('.gallery-img');
    const n = imgs.length;

    images.forEach((img, i) => {
      const relativeIndex = (i - activeIndex + n) % n;

      if (relativeIndex === 0) {
        
        gsap.to(img, {
          top: '0%', left: '0%', width: '85%', height: '85%',
          opacity: 1, scale: 1, x: 0, y: 0, zIndex: 20,
          duration: 1, ease: 'power3.inOut'
        });
      } else if (relativeIndex === 1 || (n === 2 && i === 1)) {
        
        gsap.to(img, {
          top: '40%', left: '40%', width: '60%', height: '60%',
          opacity: 1, scale: 1, x: 0, y: 0, zIndex: 10,
          duration: 1, ease: 'power3.inOut'
        });
      } else if (relativeIndex === 2) {
        
        gsap.to(img, {
          top: '40%', left: '40%', width: '60%', height: '60%',
          opacity: 0, scale: 0.95, x: 64, y: 64, zIndex: 0,
          duration: 1, ease: 'power3.inOut'
        });
      } else {
        
        // We use gsap.set here because it doesn't need to animate into this waiting position
        gsap.set(img, {
          top: '0%', left: '0%', width: '85%', height: '85%',
          opacity: 0, scale: 1.05, x: -48, y: -48, zIndex: 30
        });
      }
    });
  }, { scope: containerRef, dependencies: [activeIndex] }); // Re-run GSAP when activeIndex changes

  return (
    <div ref={containerRef} className="project-images flex-1 relative w-full aspect-[4/3] md:aspect-auto md:h-[500px]">
      {imgs.map((img, i) => (
        <div 
          key={i}
          className="gallery-img absolute rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          style={{ opacity: 0 }} // Start hidden so GSAP handles the initial reveal cleanly
        >
          <img 
            src={img} 
            alt={`Screenshot ${i + 1}`} 
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectImageGallery;

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 0.4 }) {
  const magneticRef = useRef(null);
  
  useEffect(() => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;

    const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 80) {
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children, { ref: magneticRef });
}

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const [isActive, setIsActive] = useState(false);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    
    const handleMouseOver = (e) => {
      if (
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.skill-item') ||
        e.target.closest('.gallery-img')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Handle hover and active scaling via GSAP
  useGSAP(() => {
    let scale = 1;
    let backgroundColor = 'white';
    let border = '0px solid white';

    if (isActive) {
      scale = 0.5; 
    } else if (isHovering) {
      scale = 2; 
      backgroundColor = 'transparent';
      border = '1px solid white';
    }

    gsap.to(cursorRef.current, {
      scale: scale,
      backgroundColor: backgroundColor,
      border: border,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [isHovering, isActive]);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ boxSizing: 'border-box' }}
      />
    </>
  );
};

export default CustomCursor;

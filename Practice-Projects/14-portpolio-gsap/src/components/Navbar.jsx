import React, { useRef } from 'react';
import { navLinks, personalInfo } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    
    const tl = gsap.timeline({ paused: true });
    
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });

    const playAnim = () => tl.play();
    window.addEventListener('preloaderComplete', playAnim);

    return () => {
      window.removeEventListener('preloaderComplete', playAnim);
    };
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    
    // 1. Interactive click animation (quick shrink and pop)
    gsap.fromTo(e.currentTarget, 
      { scale: 0.85 }, 
      { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );

    // 2. Cinematic smooth scroll to the target section
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: target, offsetY: 0 }, 
      ease: 'power4.inOut'
    });
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 0)} // Scroll to top
          className="text-2xl font-heading font-bold uppercase tracking-tight hover:text-white/70 transition-colors text-white"
        >
          {personalInfo.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[10px] uppercase font-mono tracking-widest text-text-muted hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Magnetic>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-[10px] uppercase font-mono tracking-widest border border-white/20 bg-white text-black px-6 py-2 hover:bg-transparent hover:text-white transition-colors block"
            >
              Connect
            </a>
          </Magnetic>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2 hover:scale-95 transition-transform">
          <span className="w-6 h-[1.5px] bg-white block"></span>
          <span className="w-6 h-[1.5px] bg-white block"></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;

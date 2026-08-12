import React, { useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Magnetic from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    
    gsap.from('.footer-title span', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      rotateX: -90,
      filter: 'blur(10px)',
      scale: 0.8,
      duration: 1.5,
      stagger: 0.05,
      ease: 'expo.out',
    });

    gsap.from('.footer-link', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    });
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" ref={footerRef} className="relative bg-[#030303] pt-32 pb-12 overflow-hidden">
      <div className="container-custom relative z-10">

        <div className="mb-24 md:mb-40 flex flex-col items-center text-center">
          <span className="block text-xs font-mono text-white/40 uppercase tracking-[0.3em] mb-8">
            04 — Let's collaborate
          </span>
          
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
            target="_blank"
            rel="noreferrer"
            className="footer-title group text-[14vw] md:text-[12vw] leading-[0.85] font-heading uppercase text-white overflow-hidden block hover:scale-105 transition-transform duration-700 ease-out"
          >
            <span className="inline-block">L</span>
            <span className="inline-block">E</span>
            <span className="inline-block">T</span>
            <span className="inline-block">'</span>
            <span className="inline-block">S</span>
            <span className="inline-block">&nbsp;</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 group-hover:from-white group-hover:to-white">T</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 group-hover:from-white group-hover:to-white">A</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 group-hover:from-white group-hover:to-white">L</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 group-hover:from-white group-hover:to-white">K</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 group-hover:from-white group-hover:to-white">.</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-white/10 pt-12">
          
          <div className="flex flex-col gap-6">
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
              target="_blank"
              rel="noreferrer"
              className="footer-link text-2xl md:text-5xl font-heading text-white hover:text-white/70 transition-colors inline-block"
            >
              {personalInfo.email}
            </a>
            
            <div className="flex gap-8 mt-4">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="footer-link text-sm font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors relative group">
                LinkedIn
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer-link text-sm font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors relative group">
                GitHub
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-8 w-full md:w-auto">
            <div className="w-full flex justify-between md:justify-end items-center">
              <span className="text-white/30 font-mono text-sm md:hidden">Back to top</span>
              <Magnetic strength={0.6}>
                <button 
                  onClick={scrollToTop}
                  className="footer-link group w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-colors duration-500"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-black transition-colors duration-500">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </button>
              </Magnetic>
            </div>

            <div className="footer-link text-left md:text-right mt-8 md:mt-0">
              <p className="text-sm font-light text-white/40">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <p className="text-xs font-mono text-white/20 mt-2">
                Designed & Built with React + GSAP
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[100vw] md:w-[80vw] h-[100vw] md:h-[80vw] bg-white/[0.02] rounded-full blur-3xl pointer-events-none z-0"></div>
    </footer>
  );
};

export default Footer;

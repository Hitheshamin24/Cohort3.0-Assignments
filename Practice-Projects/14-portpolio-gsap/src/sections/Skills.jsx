import React, { useRef } from 'react';
import { skills } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Reveal section header
    gsap.from('.skills-header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Stagger reveal the skill categories and items
    const categories = gsap.utils.toArray('.skill-category');
    categories.forEach((cat, i) => {
      
      // Reveal Category Title
      gsap.from(cat.querySelector('.category-title'), {
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Reveal List Items sequentially
      gsap.from(cat.querySelectorAll('.skill-item'), {
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
      });
    });

  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-[#050505]">
      <div className="container-custom">
        
        {/* Header */}
        <div className="skills-header mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="block text-xs font-mono text-white/40 uppercase tracking-[0.3em] mb-4">
              03 — Technical Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-heading uppercase text-white">
              Capabilities
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm font-light leading-relaxed">
            A curated stack of modern technologies I use to build scalable, high-performance web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {skills.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title text-xl md:text-2xl font-heading text-white mb-8 pb-4 border-b border-white/10">
                {category.category}
              </h3>
              <ul className="flex flex-col gap-0">
                {category.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="skill-item group flex items-center justify-between py-4 border-b border-white/5 cursor-pointer relative overflow-hidden"
                  >
                    {/* Hover Background Fill */}
                    <div className="absolute inset-0 bg-white/5 w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
                    
                    <span className="relative z-10 text-lg md:text-xl font-light text-white/50 group-hover:text-white transition-colors duration-300 pl-2">
                      {item}
                    </span>
                    <span className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:-translate-x-2 transition-all duration-500 ease-out">
                      ↗
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

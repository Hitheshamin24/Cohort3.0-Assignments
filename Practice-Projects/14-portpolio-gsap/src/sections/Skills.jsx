import React, { useRef } from 'react';
import { skills } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    
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

    const categories = gsap.utils.toArray('.skill-category');
    categories.forEach((cat, i) => {

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          <div className="skill-category md:col-span-2 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-colors group">
            <div className="flex flex-col h-full justify-between">
              <h3 className="category-title text-2xl md:text-3xl font-heading text-white mb-12">
                {skills[0].category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills[0].items.map((item, i) => (
                  <span 
                    key={i} 
                    className="skill-item px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm font-mono tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="skill-category p-8 md:p-12 rounded-3xl bg-gradient-to-bl from-white/[0.04] to-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-colors group">
            <div className="flex flex-col h-full justify-between">
              <h3 className="category-title text-2xl md:text-3xl font-heading text-white mb-12">
                {skills[1].category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills[1].items.map((item, i) => (
                  <span 
                    key={i} 
                    className="skill-item px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm font-mono tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="skill-category md:col-span-3 p-8 md:p-12 rounded-3xl bg-gradient-to-t from-white/[0.04] to-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h3 className="category-title text-2xl md:text-3xl font-heading text-white">
              {skills[2].category}
            </h3>
            <div className="flex flex-wrap gap-3 md:justify-end flex-1">
              {skills[2].items.map((item, i) => (
                <span 
                  key={i} 
                  className="skill-item px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm font-mono tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;

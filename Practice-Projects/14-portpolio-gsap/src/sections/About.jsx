import React, { useRef } from 'react';
import { aboutCards } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const cardImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
];

const About = () => {
  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);

  useGSAP(() => {
    // Parallax effect on the images inside the cards as you scroll
    const images = gsap.utils.toArray('.card-parallax-img');
    images.forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: 100, // Move image down as we scroll past, creating a parallax window
        ease: 'none'
      });
    });

    // Reveal animation for the sticky left header
    gsap.from('.sticky-header-reveal', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative bg-[#050505] pt-48 pb-32 md:pt-64 md:pb-48">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-40">
              <span className="sticky-header-reveal block text-xs font-mono text-white/40 uppercase tracking-[0.3em] mb-8">
                01 — Core Focus
              </span>
              <h2 className="sticky-header-reveal text-5xl md:text-7xl font-heading font-bold uppercase text-white leading-[0.9] mb-8">
                The <br/> Identity.
              </h2>
              <div className="sticky-header-reveal w-16 h-[1px] bg-white/20"></div>
            </div>
          </div>

          {/* Right Column: Scrolling Cinematic Cards */}
          <div ref={rightColumnRef} className="lg:w-2/3 flex flex-col gap-8 md:gap-12 mt-12 lg:mt-0">
            {aboutCards.map((card, index) => (
              <div 
                key={card.id} 
                className="group relative h-[300px] md:h-[350px] w-full rounded-md overflow-hidden flex items-end p-6 md:p-8 cursor-pointer border border-white/5"
              >
                {/* Image Background with Parallax */}
                <div className="absolute inset-0 -top-16 -bottom-16 overflow-hidden pointer-events-none">
                  <img 
                    src={cardImages[index]} 
                    alt={card.title} 
                    className="card-parallax-img w-full h-full object-cover scale-[1.05] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 ease-out" 
                  />
                </div>

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="flex items-center gap-4 mb-3 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-mono text-white">0{index + 1}</span>
                    <div className="w-6 h-[1px] bg-white"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading uppercase text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {card.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

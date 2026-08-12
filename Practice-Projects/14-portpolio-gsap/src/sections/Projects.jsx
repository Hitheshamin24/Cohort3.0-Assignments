import React, { useRef } from 'react';
import { projects } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectImageGallery from '../components/ProjectImageGallery';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    
    const projectRows = gsap.utils.toArray('.project-row');

    projectRows.forEach((row, i) => {
      const textCol = row.querySelector('.project-text');
      const imgCol = row.querySelector('.project-images');

      gsap.from(textCol, {
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(imgCol, {
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2
      });
    });

  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="section-padding relative bg-[#030303]">
      <div className="container-custom">

        <div className="mb-24 md:mb-40">
          <h2 className="text-4xl md:text-6xl font-heading mb-4">Selected Work</h2>
          <div className="w-full h-px bg-white/10 mt-8"></div>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={project.id} className={`project-row flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>

                <div className="project-text flex-1 flex flex-col w-full">
                  <div className="text-label mb-6">{project.index}</div>
                  <h3 className="text-4xl md:text-6xl font-heading mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-lg mb-8 max-w-md font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white/80 bg-white/5">
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary py-3 px-6 text-xs">
                        Live Site
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-medium border-b border-white/20 pb-1 hover:border-white transition-colors">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <ProjectImageGallery imgs={project.imgs} />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;

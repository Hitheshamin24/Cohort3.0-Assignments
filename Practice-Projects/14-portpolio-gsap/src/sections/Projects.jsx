import { useRef, useLayoutEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// ProjectRow Component — Single Project in Editorial Layout
// ─────────────────────────────────────────────────────────────
const ProjectRow = ({ project, isEven }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const rowRef = useRef(null);
  const imgRef = useRef(null);
  const imgWrapRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Create a Timeline for this Project Row ─────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          markers: true, // 🟢 Enabled debug markers for development!
        },
      });

      // 1. Clip-path Image Reveal (Wipe from bottom to top)
      tl.from(imgWrapRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.0,
        ease: 'power3.inOut',
      });

      // 2. Staggered Text Content Reveal
      const textElements = textRef.current.children;
      tl.from(
        textElements,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6' // Overlap slightly with image reveal
      );

      // 3. Image Parallax Scrub on Scroll
      gsap.to(imgRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2, // Links animation to scroll position with 1.2s lag
        },
      });
    }, rowRef);

    return () => ctx.revert();
  }, [isEven]);

  // ── Hover interaction ──────────────────────────────────────
  const onImgEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const onImgLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const prevImg = () =>
    setImgIndex((i) => (i - 1 + project.imgs.length) % project.imgs.length);
  const nextImg = () =>
    setImgIndex((i) => (i + 1) % project.imgs.length);

  // ── Text Block ─────────────────────────────────────────────
  const textBlock = (
    <div
      ref={textRef}
      className="flex flex-col justify-center"
      style={{ flex: '0 0 42%', padding: '3rem 0' }}
    >
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase mb-3 block"
        style={{ color: 'var(--color-accent)' }}
      >
        {project.index}.
      </span>

      <h3
        className="font-bold mb-2"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          lineHeight: 1.05,
        }}
      >
        {project.title}
      </h3>

      <p
        className="font-mono text-xs tracking-[0.15em] uppercase mb-5"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {project.subtitle}
      </p>

      <div className="accent-line mb-5" />

      <p
        className="mb-6 leading-relaxed"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)',
          maxWidth: '44ch',
        }}
      >
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs tracking-wider uppercase px-2.5 py-1"
            style={{
              color: 'var(--color-text-tertiary)',
              border: '1px solid var(--color-border)',
              borderRadius: '3px',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          <FaGithub size={14} />
          Code
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--color-accent)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );

  // ── Image Block ────────────────────────────────────────────
  const imageBlock = (
    <div
      ref={imgWrapRef}
      className="relative"
      style={{
        flex: '0 0 54%',
        overflow: 'hidden',
        borderRadius: '8px',
        aspectRatio: '16/10',
        cursor: 'pointer',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={onImgEnter}
      onMouseLeave={onImgLeave}
    >
      <img
        ref={imgRef}
        src={project.imgs[imgIndex]}
        alt={`${project.title} — screenshot ${imgIndex + 1}`}
        className="w-full h-full object-cover"
        style={{ transformOrigin: 'center center' }}
      />

      {project.imgs.length > 1 && (
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2"
          style={{ zIndex: 2 }}
        >
          <button
            onClick={prevImg}
            className="w-7 h-7 flex items-center justify-center font-mono text-xs transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(10,10,10,0.75)',
              color: 'var(--color-text-secondary)',
              borderRadius: '4px',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <span
            className="font-mono text-xs"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {imgIndex + 1}/{project.imgs.length}
          </span>
          <button
            onClick={nextImg}
            className="w-7 h-7 flex items-center justify-center font-mono text-xs transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(10,10,10,0.75)',
              color: 'var(--color-text-secondary)',
              borderRadius: '4px',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        style={{
          height: '1px',
          backgroundColor: 'var(--color-border)',
          width: '100%',
        }}
      />

      <article
        ref={rowRef}
        className="flex items-center justify-between gap-12"
        style={{ padding: '5rem 0' }}
      >
        {isEven ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </article>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Projects Section
// ─────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          markers: true, // 🟢 Enabled debug markers for section heading
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16">
          <p className="mono-label mb-4">02. Work</p>
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Selected Work
          </h2>
        </div>

        {/* Project Rows */}
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            isEven={i % 2 !== 0}
          />
        ))}

        <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>
    </section>
  );
};

export default Projects;

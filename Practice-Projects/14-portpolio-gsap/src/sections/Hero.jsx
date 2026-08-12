import { useRef, useLayoutEffect } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { personalInfo } from '../data/portfolioData';


const Hero = () => {

  const heroRef = useRef(null);

  const scrollToWork = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── GSAP Animation ────────────────────────────────────────
  // useLayoutEffect fires AFTER the DOM is updated but BEFORE
  // the browser paints. This means GSAP sets elements to their
  // initial "from" state (opacity:0, y:40) before the user ever
  // sees them — no flash of un-animated content.
  useLayoutEffect(() => {
    // gsap.context() does two things:
    //   1. Scopes all GSAP selectors to heroRef.current
    //   2. Tracks all tweens so ctx.revert() can clean them up
    const ctx = gsap.context(() => {

      // ── Create a Timeline ───────────────────────────────
      // gsap.timeline() groups tweens into a sequence.
      // Each tween starts after the previous one (by default).
      // We use position offsets like "<+0.2" to fine-tune timing:
      //   "<"     = start at the same time as the previous tween
      //   "<+0.2" = start 0.2s AFTER the previous tween STARTED
      //   ">+0.2" = start 0.2s AFTER the previous tween ENDED
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      // defaults: { ease } applies this ease to every tween in the timeline
      // so we don't have to repeat it on every .from() call

      // ── Step 1: Animate the label ("01. Introduction") ──
      // from() animates FROM these values TO the element's natural state
      // opacity: 0 → 1  (fade in)
      // y: 20 → 0       (slide up 20px)
      tl.from('[data-hero="label"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // ── Step 2: Text Reveal — headline words ────────────
      // The outer <span className="overflow-hidden"> acts as a clip mask.
      // The inner <span data-hero="word"> starts at y:"110%" (fully below the mask)
      // and slides up to y:"0%" (its natural position, visible inside the mask).
      //
      // stagger: 0.12 means each word starts 0.12s after the previous one.
      // This creates the word-by-word reveal cascade.
      //
      // "<+0.1" = start 0.1s after the label tween STARTED (overlap slightly)
      tl.from('[data-hero="word"]', {
        y: '110%',
        duration: 0.9,
        stagger: 0.12,
      }, '<+0.1');

      // ── Step 3: Subtitle ────────────────────────────────
      // Simple fade + slide.
      // "<+0.5" = starts 0.5s after the word tween started
      // (the words are still animating — they overlap on purpose)
      tl.from('[data-hero="sub"]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
      }, '<+0.5');

      // ── Step 4: CTA Buttons ──────────────────────────────
      // scale: 0.95 → 1 gives a subtle "pop in" feel.
      // Combined with opacity: 0 → 1 it feels premium.
      tl.from('[data-hero="ctas"]', {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
      }, '<+0.3');

      // ── Step 5: Scroll Indicator ─────────────────────────
      // Fades in last, then the CSS hero-bounce class takes over.
      tl.from('[data-hero="scroll"]', {
        opacity: 0,
        y: 10,
        duration: 0.5,
      }, '<+0.2');

    }, heroRef); // ← scope: only search inside heroRef.current

  
    return () => ctx.revert();

  }, []); 

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 'var(--navbar-h)' }}
    >

      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent 60%, var(--color-bg) 100%),
            radial-gradient(circle, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px',
        }}
      />

      {/* Accent glow blob — top-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
          transform: 'translate(20%, -20%)',
        }}
      />

      {/* Main content — all GSAP targets live inside this container */}
      <div className="container relative z-10">

        {/* Label */}
        <p className="mono-label mb-6" data-hero="label">
          01. Introduction
        </p>

        <h1
          className="font-bold leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}
          data-hero="headline"
        >
     
          <span className="block overflow-hidden">
            <span className="block" data-hero="word">Full Stack</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" style={{ color: 'var(--color-accent)' }} data-hero="word">
              Developer.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-10 max-w-xl"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}
          data-hero="sub"
        >
          {personalInfo.tagline}
          <br />
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-base)' }}>
            {personalInfo.subTagline}
          </span>
        </p>

        {/* CTAs — animated as a group */}
        <div className="flex flex-wrap items-center gap-4" data-hero="ctas">

          {/* Primary — View Work (filled cyan) */}
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-3 font-mono text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#0a0a0a',
              fontWeight: 700,
              padding: '14px 32px',
              letterSpacing: '0.12em',
              borderRadius: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(35,221,246,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Work
            <ExternalLink size={15} strokeWidth={2.5} />
          </button>

          {/* Secondary — GitHub (outlined) */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-mono text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              padding: '14px 32px',
              letterSpacing: '0.12em',
              fontWeight: 500,
              borderRadius: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaGithub size={16} />
            GitHub
          </a>

        </div>
      </div>

      {/* Scroll indicator — fades in last, CSS bounce loop after */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        data-hero="scroll"
        aria-label="Scroll down"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="hero-bounce" />
      </div>

    </section>
  );
};

export default Hero;

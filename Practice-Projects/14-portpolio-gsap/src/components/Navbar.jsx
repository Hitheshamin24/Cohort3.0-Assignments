import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolioData';


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu when a link is clicked
  const handleNavClick = (href) => {
    setMenuOpen(false);
    // Smooth scroll to the target section
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--color-surface)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="container h-full flex items-center justify-between">

          {/* Clicking the logo scrolls back to the top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono font-bold text-sm tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Scroll to top"
          >
            {personalInfo.name}
          </button>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                // Merge Contact link with email CTA
                if (link.href === "#contact") {
                  return (
                    <a
                      key={link.name}
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200"
                      style={{
                        color: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--color-text-primary)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>

          </nav>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ color: 'var(--color-text-primary)' }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </header>

     
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-surface)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-1rem)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => {
              if (link.href === "#contact") {
                return (
                  <li key={link.name}>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-2xl tracking-widest uppercase px-4 py-2 border transition-all duration-200"
                      style={{
                        color: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>
                        0{i + 1}.{' '}
                      </span>
                      {link.name}
                    </a>
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-mono text-2xl tracking-widest uppercase transition-colors duration-200"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                  >
                    <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>
                      0{i + 1}.{' '}
                    </span>
                    {link.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

     
    </>
  );
};



export default Navbar;


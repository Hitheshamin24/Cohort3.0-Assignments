import React from 'react';

// Components (built stage by stage)
import Navbar       from './components/Navbar';
import CustomCursor from './components/CustomCursor';

// Sections (built stage by stage)
import Hero       from './sections/Hero';
import About      from './sections/About';
import Skills     from './sections/Skills';
import Projects   from './sections/Projects';
import Experience from './sections/Experience';
import Contact    from './sections/Contact';

const App = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
};

export default App;
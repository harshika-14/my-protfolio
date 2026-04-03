import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { Spotlight } from './components/Spotlight';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-200 selection:bg-accent/30 selection:text-accent selection:backdrop-blur-sm">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Spotlight Effect */}
      <Spotlight />
      
      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

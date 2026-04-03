import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = NAV_ITEMS.map(item => item.name.toLowerCase());
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "py-4 bg-[#030014]/80 backdrop-blur-md border-b border-white/10" : "py-8"
      )}
    >
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">H</div>
          <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent uppercase">HARSHIKA</span>
        </motion.div>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a 
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-accent",
                  activeSection === item.name ? "text-accent" : "text-slate-400"
                )}
              >
                {item.name}
                {activeSection === item.name && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent hover:text-white transition-all"
        >
          Hire Me
        </motion.a>
      </nav>
    </header>
  );
};

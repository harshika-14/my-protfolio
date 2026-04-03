import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
      
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-mono tracking-widest text-accent uppercase"
          >
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
          >
            <span className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              HARSHIKA
            </span>
            <span className="block text-glow bg-gradient-to-r from-accent via-blue-400 to-accent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] bg-clip-text text-transparent">
              BIGHANE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            Creative and detail-oriented designer specialized in Graphics, UI/UX, and Web Development. 
            Blending technical skills with IoT and robotics to build the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 rounded-full bg-accent text-white font-semibold overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
            
            <div className="flex items-center gap-4">
              {[
                { Icon: Github, href: 'https://github.com/harshika-14', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/harshika-bighane-1a9b4629a', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:text-accent hover:border-accent/50 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

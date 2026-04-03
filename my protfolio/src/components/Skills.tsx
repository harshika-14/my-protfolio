import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const SKILLS = [
  { name: 'Graphic Design (Canva)', level: 95, color: '#8b5cf6' },
  { name: 'Web Development (HTML/CSS/JS)', level: 90, color: '#3b82f6' },
  { name: 'UI/UX Design (Figma)', level: 85, color: '#06b6d4' },
  { name: 'Programming (C/C++/Python)', level: 80, color: '#ec4899' },
  { name: 'Robotics & IoT', level: 75, color: '#f59e0b' },
  { name: 'MERN Stack', level: 70, color: '#10b981' },
];

export const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Technical <span className="text-accent">Arsenal</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A comprehensive suite of technologies and methodologies I use to bring complex ideas to life.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-medium text-slate-300">{skill.name}</span>
                <span className="text-xs font-mono text-accent">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: skill.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-accent/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 40}px`
              }}
            >
              {['{}', '</>', '[]', '()', '=>'][i % 5]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

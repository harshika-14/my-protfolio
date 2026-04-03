import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { EXPERIENCES } from '../constants';

export const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-accent">Journey</span>
          </h2>
          <p className="text-slate-500">A timeline of my career growth and contributions.</p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-accent via-blue-500 to-transparent -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-accent border-4 border-[#030014] shadow-[0_0_15px_rgba(139,92,246,0.8)] -translate-x-1/2 z-10 hidden md:block" />

                <div className="w-full md:w-1/2">
                  <div className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-accent/30 transition-all group">
                    <span className="text-xs font-mono text-accent mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">{exp.role}</h3>
                    <h4 className="text-slate-400 font-medium mb-4">{exp.company}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

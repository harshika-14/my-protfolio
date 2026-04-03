import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { Cpu, Globe, Zap } from 'lucide-react';
import profileImage from './harshika.jpeg';

export const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              transitionSpeed={1500}
              className="relative z-10"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Rotating Ring */}
                <div className="absolute inset-[-20px] border border-accent/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-[-40px] border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Profile Image Container */}
                <div className="w-full h-full rounded-3xl overflow-hidden glass-morphism p-4">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
                  </div>
                </div>

                {/* Floating Tags */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 glass px-4 py-2 rounded-xl border border-accent/30 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono">Working on IoT</span>
                </motion.div>
              </div>
            </Tilt>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Creative <span className="text-accent text-glow">Designer</span> & Developer
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                I'm a B.Tech student in Computer Science Engineering at Jhulelal Institute of Technology, Nagpur. 
                I specialize in Graphics, UI/UX, and Web Development, with a growing passion for IoT and automation. 
                I bridge the gap between creative design and technical implementation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Cpu, title: 'Programming', desc: 'C, C++, Python' },
                  { icon: Globe, title: 'Web Dev', desc: 'MERN Stack, PHP, SQL' },
                  { icon: Zap, title: 'Design Tools', desc: 'Canva (Adv), Figma' },
                  { icon: Globe, title: 'Robotics & IoT', desc: 'Sensors & Automation' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl glass-morphism border border-white/5 hover:border-accent/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

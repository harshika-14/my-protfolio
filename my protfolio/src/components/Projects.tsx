import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-accent">Creations</span>
            </h2>
            <p className="text-slate-500 max-w-xl">
              A selection of my recent work, ranging from complex web applications to experimental interactive pieces.
            </p>
          </div>
          <a
            href="https://github.com/harshika-14?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="text-accent font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                className="h-full"
              >
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-full glass-morphism rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-accent/50 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-contain bg-[#060019] p-2 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#030014]/90 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl glass-morphism rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 h-full max-h-[80vh] overflow-y-auto">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain bg-[#060019] p-4"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030014]/20" />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {selectedProject.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-3 rounded-full bg-accent text-white font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
                    >
                      Code <ExternalLink className="w-4 h-4" />
                    </a>
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github}
                        className="px-8 py-3 rounded-full glass border border-white/10 font-semibold flex items-center gap-2 hover:bg-white/5 transition-all"
                      >
                        GitHub <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

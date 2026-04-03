import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center text-white text-[10px] font-bold">HB</div>
            <span className="font-bold tracking-tighter">HARSHIKA</span>
          </div>
          
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Harshika Bighane. Built with passion and futuristic tech.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="https://www.linkedin.com/in/harshika-bighane-1a9b4629a" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="https://github.com/harshika-14" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <a href="mailto:harshikabighane868@gmail.com" className="hover:text-accent transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

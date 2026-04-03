import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      await response.json();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (_e) {
      setError('Submission save nahi hua. Backend server run hai kya check karo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something <span className="text-accent text-glow">Extraordinary</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Have a project in mind or just want to say hi? Feel free to reach out. 
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'harshikabighane868@gmail.com',
                  href: 'mailto:harshikabighane868@gmail.com',
                },
                { icon: Phone, label: 'Phone', value: '+91 8446470259', href: 'tel:+918446470259' },
                { icon: MapPin, label: 'Location', value: 'Nagpur, Maharashtra' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:border-accent/50 transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-slate-200 font-medium hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-200 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-morphism p-8 md:p-10 rounded-[2.5rem] border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button 
                  disabled={isSubmitting || isSuccess}
                  className="w-full group relative py-4 rounded-2xl bg-accent text-white font-bold overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Message Sent <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="default"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"} 
                        {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

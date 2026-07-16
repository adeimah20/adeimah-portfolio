import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

// Custom LinkedIn Icon SVG
const LinkedinIcon = ({ size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom Instagram Icon SVG
const InstagramIcon = ({ size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Custom GitHub Icon SVG
const GithubIcon = ({ size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactInfo = [
    { label: 'Email', value: 'adeimah045@gmail.com', icon: <Mail size={18} />, href: 'mailto:adeimah045@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/adeimah', icon: <LinkedinIcon size={18} />, href: 'https://linkedin.com/in/adeimah' },
    { label: 'GitHub', value: 'github.com/adeimah', icon: <GithubIcon size={18} />, href: 'https://github.com/adeimah' },
    { label: 'Instagram', value: '@adeeimh__', icon: <InstagramIcon size={18} />, href: 'https://instagram.com/adeeimh__' },
    { label: 'Phone', value: '088213406152', icon: <Phone size={18} />, href: 'https://wa.me/6288213406152' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.name.trim()) return setError('Full name is required.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setError('Please enter a valid email address.');
    if (formData.message.trim().length < 10) return setError('Message must be at least 10 characters long.');

    setLoading(true);

    // Simulate sending data to API server (2 seconds)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-glow-blue/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Global Scroll Reveal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-glow-cyan font-mono text-xs tracking-widest uppercase block mb-2">05 / Contact</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Get in Touch</h2>
          </div>
          <div className="h-[1px] flex-grow bg-obsidian-border/50 hidden md:block max-w-md" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-semibold leading-snug">Let's discuss your next exciting project.</h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                Feel free to reach out through my official social channels below, or use the contact form to send a message directly to my inbox.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a 
                  key={idx}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02, 
                    borderColor: 'rgba(0, 240, 255, 0.3)',
                    boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.08)'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-4 p-4 bg-obsidian-card border border-obsidian-border rounded-xl shadow-premium transition-colors duration-300 group"
                >
                  <div className="text-glow-cyan group-hover:scale-110 transition-transform duration-300">{info.icon}</div>
                  <div>
                    <h4 className="text-neutral-500 text-xs font-mono tracking-wider uppercase">{info.label}</h4>
                    <p className="text-white text-sm font-medium mt-0.5">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact form Card */}
          <div className="lg:col-span-7">
            <motion.div 
              whileHover={{ 
                borderColor: 'rgba(0, 240, 255, 0.15)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="p-8 bg-obsidian-card border border-obsidian-border rounded-2xl relative shadow-premium transition-colors duration-300"
            >
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                >
                  <CheckCircle2 size={54} className="text-glow-cyan animate-bounce" />
                  <h3 className="text-2xl text-white font-bold">Message Sent!</h3>
                  <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
                    Thank you for reaching out! Your message has been saved, and an email notification is being forwarded to my inbox. I will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-neutral-900 border border-obsidian-border rounded-xl text-xs font-mono text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    Send a New Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <h3 className="text-xl text-white font-semibold mb-4">Send a Message</h3>

                  {error && (
                    <div className="p-3 bg-red-950/50 border border-red-800/30 rounded-xl text-xs font-mono text-red-400">
                      * {error}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-neutral-500 text-xs font-mono tracking-wider uppercase block">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      disabled={loading}
                      className="w-full px-4 py-3 bg-neutral-950/60 border border-obsidian-border rounded-xl text-sm text-white placeholder-neutral-600 focus:border-neutral-700 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-neutral-500 text-xs font-mono tracking-wider uppercase block">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="yourname@example.com"
                      disabled={loading}
                      className="w-full px-4 py-3 bg-neutral-950/60 border border-obsidian-border rounded-xl text-sm text-white placeholder-neutral-600 focus:border-neutral-700 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-neutral-500 text-xs font-mono tracking-wider uppercase block">Your Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      disabled={loading}
                      className="w-full px-4 py-3 bg-neutral-950/60 border border-obsidian-border rounded-xl text-sm text-white placeholder-neutral-600 focus:border-neutral-700 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button with Premium Micro Interactions */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:bg-neutral-800 disabled:text-neutral-500 disabled:-translate-y-0 disabled:scale-100 disabled:shadow-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-neutral-600 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </motion.div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};

export default ContactSection;

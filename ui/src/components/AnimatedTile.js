'use client';
import { motion } from 'framer-motion';

export default function AnimatedTile({ icon, title, description, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.045, boxShadow: '0 12px 32px 0 rgba(132,67,220,0.18), 0 2px 12px 0 rgba(223,167,32,0.10)' }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.25 }}
      viewport={{ once: true }}
      className={`relative flex flex-col items-center justify-center min-h-[160px] min-w-[180px] max-w-full p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 border-transparent hover:border-gradient-to-r hover:from-brandPurple hover:to-brandGold shadow-xl overflow-hidden transition-colors duration-300 ${className}`}
      style={{ borderImage: 'linear-gradient(90deg, #8443dc, #dfa720) 1', borderWidth: 2, borderStyle: 'solid' }}
    >
      {/* SVG overlay for advanced graphics */}
      <svg className="absolute -top-6 -right-6 w-24 h-24 opacity-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="#8443dc" strokeWidth="4" />
        <circle cx="50" cy="50" r="32" stroke="#dfa720" strokeWidth="2" />
      </svg>
      {icon && <div className="mb-2 text-4xl">{icon}</div>}
      {title && <div className="gradient-text text-xl font-bold mb-1 text-center">{title}</div>}
      {description && <div className="text-base text-gray-700 dark:text-gray-300 text-center mb-1">{description}</div>}
      {children}
    </motion.div>
  );
} 
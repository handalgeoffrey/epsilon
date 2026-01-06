'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'The Courses', href: '/courses' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Admission', href: '/admission' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg shadow-none border-b border-white/10 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 -my-6 transition-transform hover:scale-105">
              <Image
                src="/epsilon/logowt.png"
                alt="Epsilon Logo Dark"
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-contain transition-opacity duration-300 opacity-0 dark:opacity-100"
                priority
              />
              <Image
                src="/epsilon/logo.png"
                alt="Epsilon Logo Light"
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-contain transition-opacity duration-300 opacity-100 dark:opacity-0"
                priority
              />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brandPurple to-brandGold">Epsilon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-4 items-center text-sm font-medium">
              {navLinks.map(link => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`transition-all duration-200 px-3 py-1.5 rounded-full ${pathname === link.href ? 'text-brandPurple font-bold bg-white/70 dark:bg-white/10 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:text-brandGold hover:bg-white/40 dark:hover:bg-white/5'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pl-2 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-slate-800 dark:text-white p-2 focus:outline-none hover:bg-white/20 rounded-full transition-colors active:scale-95 z-50 mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-colors duration-300"></div>

        <div className="relative z-50 flex flex-col items-center gap-6 p-6 h-full overflow-y-auto pt-24">
          {/* Mobile Toggle */}
          <div className="mb-4 transform scale-125">
            <ThemeToggle />
          </div>

          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-medium py-2 px-6 rounded-full w-full text-center transition-all ${pathname === link.href
                ? 'bg-purple-100 dark:bg-purple-900/30 text-brandPurple dark:text-purple-300 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-brandPurple to-brandGold text-white font-bold shadow-lg active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
} 
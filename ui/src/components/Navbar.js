'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

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
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg shadow-none border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-50" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/epsilon/logo.png"
              alt="Epsilon Logo"
              width={100}
              height={100}
              className="object-contain w-20 h-20 sm:w-24 sm:h-24 -my-6 transition-transform hover:scale-105"
              priority
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brandPurple to-brandGold">Epsilon</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 items-center text-sm font-medium">
            {navLinks.map(link => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 px-3 py-1.5 rounded-full ${pathname === link.href ? 'text-brandPurple font-bold bg-white/70' : 'text-slate-700 hover:text-brandGold hover:bg-white/40'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-slate-800 p-2 focus:outline-none hover:bg-white/20 rounded-full transition-colors active:scale-95"
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
          backdropFilter: 'blur(10px)',
          top: '0',
          paddingTop: '80px'
        }}
      >
        <div className="flex flex-col items-center gap-6 p-6 h-full overflow-y-auto">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-medium py-2 px-6 rounded-full w-full text-center transition-all ${pathname === link.href
                ? 'bg-purple-100 text-brandPurple font-bold'
                : 'text-slate-800 hover:bg-slate-100'
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
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'The Courses', href: '/courses' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Admission', href: '/admission' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg shadow-none border-b border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 mb-2 sm:mb-0">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/90 shadow border border-white/60 mr-2">
            <Image src="/epsilon/logo.jpg" alt="Epsilon Logo" width={60} height={60} className="rounded-md object-contain" priority />
          </span>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brandPurple to-brandGold">Epsilon</span>
        </Link>
        <ul className="flex flex-wrap gap-4 justify-center items-center text-base font-medium">
          {navLinks.map(link => (
            <li key={link.name} className="relative group">
              <Link
                href={link.href}
                className={`transition-colors duration-200 px-2 py-1 rounded-md ${pathname === link.href ? 'text-brandPurple font-bold bg-white/70' : 'text-gray-800/90 hover:text-brandGold'}`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-gradient-to-r from-brandPurple to-brandGold transition-all duration-300 ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 
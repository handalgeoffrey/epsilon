'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-t border-white/20 dark:border-white/5 py-8 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Brand & Copyright */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-amber-600">
                        Epsilon
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} Epsilon Centre. All rights reserved.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4">
                    <SocialLink href="https://www.facebook.com/Epsilontvm" icon={<FaFacebook />} color="text-blue-600" />
                    <SocialLink href="https://www.instagram.com/epsilon.trivandrum/" icon={<FaInstagram />} color="text-pink-500" />
                    <SocialLink href="https://api.whatsapp.com/send/?phone=917736556277" icon={<FaWhatsapp />} color="text-green-500" />
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, color }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${color} hover:scale-110 transition-transform opacity-80 hover:opacity-100`}
        >
            {icon}
        </a>
    );
}

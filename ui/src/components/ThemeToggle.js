'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
        );
    }

    const isDark = theme === 'dark';

    const toggleTheme = (e) => {
        if (!document.startViewTransition) {
            setTheme(isDark ? 'light' : 'dark');
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setTheme(isDark ? 'light' : 'dark');
            });
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner overflow-hidden group ${isDark ? 'bg-slate-800' : 'bg-sky-200'
                }`}
            aria-label="Toggle Dark Mode"
        >
            {/* Background Elements */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                {/* Stars */}
                <div className="absolute top-2 left-4 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>
                <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full opacity-40"></div>
                <div className="absolute top-3 right-5 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
            </div>

            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                {/* Clouds */}
                <div className="absolute top-2 right-3 w-4 h-2 bg-white rounded-full opacity-60 blur-[1px]"></div>
                <div className="absolute bottom-1 left-5 w-5 h-2 bg-white rounded-full opacity-40 blur-[2px]"></div>
            </div>

            {/* The Toggle Knob (Sun/Moon) */}
            <motion.div
                layout
                className={`relative w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10 ${isDark
                    ? 'bg-gradient-to-br from-slate-100 to-slate-300'
                    : 'bg-gradient-to-br from-amber-300 to-yellow-500'
                    }`}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30
                }}
                animate={{
                    x: isDark ? 40 : 0,
                    rotate: isDark ? 360 : 0
                }}
            >
                <AnimatePresence mode='wait' initial={false}>
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaMoon className="text-slate-700 text-xs" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaSun className="text-white text-md drop-shadow-sm" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}

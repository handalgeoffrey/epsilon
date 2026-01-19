import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import PageBackground from '@/components/PageBackground';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            <PageBackground />
            <div className="text-center space-y-6 max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 animate-fade-in-up">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaExclamationTriangle className="text-4xl text-red-500" />
                </div>

                <h2 className="text-6xl font-bold text-slate-900 dark:text-white">404</h2>
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-gray-200">Page Not Found</h3>

                <p className="text-slate-600 dark:text-slate-400">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg"
                >
                    <FaHome />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600 animate-bounce">
                <FaExclamationTriangle className="text-4xl" />
            </div>
            <h1 className="text-6xl font-extrabold text-slate-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
            <p className="text-slate-500 max-w-md mb-8">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
                Go Back Home
            </Link>
        </div>
    );
}

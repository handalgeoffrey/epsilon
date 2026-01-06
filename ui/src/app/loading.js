export default function Loading() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-600 dark:border-purple-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading Epsilon...</p>
        </div>
    );
}

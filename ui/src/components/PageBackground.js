'use client';

export default function PageBackground() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* 1. Base Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(to right, #9ca3af 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                }}
            />

            {/* 2. Vibrant Animated Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-amber-300/30 dark:bg-amber-600/25 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />

            {/* 3. Floating Math Elements (Graphic Design Elements) */}
            <div className="absolute top-[15%] left-[5%] text-9xl font-serif text-slate-900/5 dark:text-white/5 rotate-12 select-none">
                ∫
            </div>
            <div className="absolute bottom-[20%] right-[5%] text-9xl font-serif text-slate-900/5 dark:text-white/5 -rotate-12 select-none">
                ∑
            </div>
            <div className="absolute top-[40%] right-[15%] text-8xl font-serif text-slate-900/5 dark:text-white/5 rotate-45 select-none">
                π
            </div>
            <div className="absolute bottom-[10%] left-[10%] text-9xl font-serif text-slate-900/5 dark:text-white/5 -rotate-6 select-none">
                ∞
            </div>

            {/* Overlay Gradient to soften edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-slate-900/50" />
        </div>
    );
}

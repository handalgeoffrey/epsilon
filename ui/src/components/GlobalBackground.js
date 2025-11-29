'use client';
import Image from 'next/image';

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <Image
                src="/porsche.jpg"
                alt="Global Background"
                fill
                className="object-cover object-center blur-3xl opacity-30 scale-110"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80"></div>
        </div>
    );
}

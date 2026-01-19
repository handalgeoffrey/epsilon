'use client';
import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaYoutube } from 'react-icons/fa';

export default function VideoSlideshow() {
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false); // If true, show iframe instead of thumbnail
    const timeoutRef = useRef(null);

    const SLIDE_DURATION = 5000; // 5 seconds per slide

    useEffect(() => {
        // Fetch videos from admin API (Port 3000)
        const fetchVideos = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/course-videos');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setVideos(data);
                    }
                }
            } catch (error) {
                console.warn('Failed to load videos:', error);
            }
        };
        fetchVideos();
    }, []);

    useEffect(() => {
        if (videos.length === 0 || isPlaying) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % videos.length);
        }, SLIDE_DURATION);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, videos.length, isPlaying]);

    const handleManualChange = (index) => {
        setCurrentIndex(index);
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    if (videos.length === 0) return null;

    const currentVideo = videos[currentIndex];

    return (
        <div className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
            <div className="flex items-center gap-3 mb-8 justify-center animate-fade-in-up">
                <FaYoutube className="text-4xl text-red-600 drop-shadow-md" />
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                    Learn with Us
                </h2>
            </div>

            <div className="relative w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up delay-100 ring-1 ring-white/10 dark:ring-white/5 group/container">

                {/* Progress Bars */}
                <div className="absolute top-0 left-0 w-full z-20 flex px-4 pt-4 gap-2">
                    {videos.map((_, idx) => (
                        <div
                            key={idx}
                            className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer hover:h-1.5 transition-all duration-300"
                            onClick={() => handleManualChange(idx)}
                        >
                            <div
                                className={`h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-[5000ms] ease-linear ${idx === currentIndex && !isPlaying ? 'w-full' : idx < currentIndex ? 'w-full !duration-0' : 'w-0 !duration-0'}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Video Player / Thumbnail */}
                {isPlaying ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={currentVideo.title}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="absolute inset-0 group cursor-pointer" onClick={handlePlay}>
                        {/* Thumbnail Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear transform scale-100 group-hover:scale-110"
                            style={{ backgroundImage: `url(${currentVideo.thumbnail.replace('mqdefault', 'maxresdefault')})` }}
                        ></div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                                <FaPlay className="text-white text-3xl drop-shadow-lg" />
                            </div>
                        </div>

                        {/* Video Info */}
                        <div className="absolute bottom-10 left-10 max-w-2xl text-white z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                    Now Playing
                                </span>
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                    {currentVideo.duration || 'Video'}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                                {currentVideo.title}
                            </h3>

                            <p className="text-white/80 flex items-center gap-2 text-sm font-medium tracking-wide group-hover:text-white transition-colors">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                Click to watch full video
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaYoutube, FaVideo, FaTrash, FaSave, FaSync } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CourseVideos() {
    const [config, setConfig] = useState({
        playlistId: '',
        apiKey: ''
    });
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
        // Load config from localStorage for convenience
        const savedConfig = localStorage.getItem('courseVideoConfig');
        if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
        }
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch('/api/course-videos');
            if (res.ok) {
                const data = await res.json();
                setVideos(data);
            }
        } catch (error) {
            toast.error('Failed to load videos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        const newConfig = { ...config, [name]: value };
        setConfig(newConfig);
        localStorage.setItem('courseVideoConfig', JSON.stringify(newConfig));
    };

    const syncVideos = async () => {
        if (!config.apiKey || !config.playlistId) {
            toast.error('Please enter API Key and Playlist ID');
            return;
        }

        toast.loading('Fetching playlist...');

        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${config.playlistId}&maxResults=10&key=${config.apiKey}`);
            const data = await res.json();

            if (data.error) throw new Error(data.error.message);

            const mappedVideos = data.items.map(item => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.medium?.url,
                videoId: item.snippet.resourceId.videoId,
                publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
                description: item.snippet.description
            }));

            // Send to backend
            const saveRes = await fetch('/api/course-videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'sync', videos: mappedVideos })
            });

            if (saveRes.ok) {
                setVideos(mappedVideos);
                toast.success(`Synced ${mappedVideos.length} videos!`);
            } else {
                throw new Error('Failed to save to server');
            }

        } catch (error) {
            console.error(error);
            toast.error(`Sync failed: ${error.message}`);
        }
    };

    const removeVideo = async (id) => {
        if (!confirm('Are you sure you want to remove this video?')) return;

        try {
            const res = await fetch('/api/course-videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });

            if (res.ok) {
                setVideos(prev => prev.filter(v => v.id !== id));
                toast.success('Video removed');
            }
        } catch (error) {
            toast.error('Failed to remove');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center">
                    <Link href="/" className="mr-4 text-gray-600 hover:text-brandPurple"><FaArrowLeft /></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FaVideo className="text-purple-600" /> Course Videos Management
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* Configuration Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-bold mb-4">YouTube Playlist Sync</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">YouTube API Key</label>
                            <input
                                name="apiKey"
                                value={config.apiKey}
                                onChange={handleConfigChange}
                                type="password"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Enter YouTube Data API Key"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Playlist ID</label>
                            <input
                                name="playlistId"
                                value={config.playlistId}
                                onChange={handleConfigChange}
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                placeholder="PL..."
                            />
                        </div>
                    </div>
                    <button
                        onClick={syncVideos}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                        <FaSync /> Sync Playlist
                    </button>
                </div>

                {/* Videos List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-lg">Active Videos ({videos.length})</h2>
                    </div>

                    {videos.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No videos found. Sync a playlist to get started.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {videos.map(video => (
                                <div key={video.id} className="p-4 flex gap-4 items-center hover:bg-gray-50 transition-colors">
                                    <img src={video.thumbnail} alt={video.title} className="w-32 h-20 object-cover rounded-lg bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate">{video.title}</h3>
                                        <p className="text-sm text-gray-500">{video.publishedAt}</p>
                                        <a href={`https://youtu.be/${video.videoId}`} target="_blank" className="text-xs text-purple-600 hover:underline">View on YouTube</a>
                                    </div>
                                    <button
                                        onClick={() => removeVideo(video.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        title="Remove Video"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaYoutube, FaPlay, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function YouTubeIntegration() {
  const [youtubeConfig, setYoutubeConfig] = useState({
    channelId: 'UC123456789',
    playlistId: 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
    apiKey: '',
    autoSync: true,
    syncInterval: 24 // hours
  });

  const [latestVideos, setLatestVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch videos on mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const data = await res.json();
        setLatestVideos(data);
      }
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setIsLoading(false);
    }
  };

  const [showApiForm, setShowApiForm] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');

  const handleConfigUpdate = (field, value) => {
    setYoutubeConfig(prev => ({ ...prev, [field]: value }));
  };

  const saveConfig = () => {
    // Ideally save config to a separate endpoints, but for now we focus on videos
    toast.success('YouTube configuration saved (Locally)');
  };

  const syncVideos = async () => {
    if (!youtubeConfig.apiKey) {
      toast.error('Please add your YouTube API key first');
      return;
    }

    toast.loading('Syncing videos from YouTube...');

    try {
      // Fetch from YouTube Data API
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeConfig.channelId}&order=date&maxResults=10&key=${youtubeConfig.apiKey}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const videos = data.items.map(item => ({
        id: item.id.videoId, // Use YouTube ID as unique ID
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        duration: 'N/A', // Duration requires a separate API call, skipping for simplicity
        views: 'N/A'
      }));

      // Save to our backend
      const saveRes = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync', videos })
      });

      if (saveRes.ok) {
        setLatestVideos(videos);
        toast.success('Videos synced successfully');
      } else {
        throw new Error('Failed to save to backend');
      }

    } catch (error) {
      console.error(error);
      toast.error(`Failed to sync: ${error.message}`);
    }
  };

  const addApiKey = () => {
    if (!newApiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setYoutubeConfig(prev => ({ ...prev, apiKey: newApiKey }));
    setNewApiKey('');
    setShowApiForm(false);
    toast.success('API key added successfully');
  };

  const removeVideo = async (id) => {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });

      if (res.ok) {
        setLatestVideos(prev => prev.filter(video => video.id !== id));
        toast.success('Video removed successfully');
      }
    } catch (error) {
      toast.error('Failed to remove video');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/" className="mr-4 text-gray-600 hover:text-brandPurple transition-colors">
              <FaArrowLeft className="text-xl" />
            </Link>
            <div className="flex items-center gap-3">
              <FaYoutube className="text-3xl text-red-600" />
              <h1 className="text-3xl font-bold gradient-text">YouTube Integration</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuration Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">YouTube Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel ID
              </label>
              <input
                type="text"
                value={youtubeConfig.channelId}
                onChange={(e) => handleConfigUpdate('channelId', e.target.value)}
                placeholder="Enter your YouTube channel ID"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Found in your YouTube channel URL
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Playlist ID
              </label>
              <input
                type="text"
                value={youtubeConfig.playlistId}
                onChange={(e) => handleConfigUpdate('playlistId', e.target.value)}
                placeholder="Enter playlist ID"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Found in your playlist URL
              </p>
            </div>
          </div>

          {/* API Key Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">YouTube API Key</h3>
              {!youtubeConfig.apiKey && (
                <button
                  onClick={() => setShowApiForm(true)}
                  className="btn-primary"
                >
                  Add API Key
                </button>
              )}
            </div>

            {youtubeConfig.apiKey ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-800 text-sm">✓ API Key configured</span>
                <button
                  onClick={() => setYoutubeConfig(prev => ({ ...prev, apiKey: '' }))}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : showApiForm ? (
              <div className="space-y-3">
                <input
                  type="password"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="Enter your YouTube Data API v3 key"
                  className="input-field"
                />
                <div className="flex gap-3">
                  <button
                    onClick={addApiKey}
                    className="btn-primary"
                  >
                    <FaSave className="mr-2" />
                    Save API Key
                  </button>
                  <button
                    onClick={() => setShowApiForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Auto-sync Settings */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                id="autoSync"
                checked={youtubeConfig.autoSync}
                onChange={(e) => handleConfigUpdate('autoSync', e.target.checked)}
                className="rounded border-gray-300 text-brandPurple focus:ring-brandPurple"
              />
              <label htmlFor="autoSync" className="text-sm font-medium text-gray-700">
                Enable automatic video synchronization
              </label>
            </div>

            {youtubeConfig.autoSync && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sync Interval (hours)
                </label>
                <input
                  type="number"
                  value={youtubeConfig.syncInterval}
                  onChange={(e) => handleConfigUpdate('syncInterval', parseInt(e.target.value))}
                  min="1"
                  max="168"
                  className="input-field w-32"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveConfig}
              className="btn-primary"
            >
              <FaSave className="mr-2" />
              Save Configuration
            </button>
            <button
              onClick={syncVideos}
              className="btn-secondary"
              disabled={!youtubeConfig.apiKey}
            >
              <FaPlay className="mr-2" />
              Sync Videos Now
            </button>
          </div>
        </div>

        {/* Latest Videos Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Videos</h2>
            <span className="text-sm text-gray-600">
              {latestVideos.length} videos
            </span>
          </div>

          <div className="space-y-4">
            {latestVideos.map((video) => (
              <div key={video.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Published: {video.publishedAt}</span>
                    <span>Duration: {video.duration}</span>
                    <span>Views: {video.views}</span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brandPurple hover:text-brandPurple/80 text-sm inline-flex items-center gap-1 mt-1"
                  >
                    <FaYoutube />
                    Watch on YouTube
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeVideo(video.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {latestVideos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaYoutube className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No videos found. Sync with YouTube to get started.</p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">How to get your YouTube API Key:</h3>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>Create a new project or select an existing one</li>
            <li>Enable the YouTube Data API v3</li>
            <li>Create credentials (API Key)</li>
            <li>Copy the API key and paste it above</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaSearchPlus, FaFilter, FaTimes } from 'react-icons/fa';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from admin panel API
  const sampleImages = [
    {
      id: 1,
      src: '/epsilon/Gallary image 1.jpg',
      caption: 'Mathematics Workshop',
      description: 'Interactive workshop for class 12 students on advanced calculus concepts',
      category: 'Events',
      active: true,
      order: 1
    },
    {
      id: 2,
      src: '/epsilon/logo.png',
      caption: 'Epsilon Logo',
      description: 'Official Epsilon Mathematics Institute logo and branding',
      category: 'Branding',
      active: true,
      order: 2
    },
    {
      id: 3,
      src: '/epsilon/porsche.jpg',
      caption: 'Student Success',
      description: 'Celebrating student achievements in mathematics competitions',
      category: 'Achievements',
      active: true,
      order: 3
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setImages(sampleImages);
      setFilteredImages(sampleImages);
      setLoading(false);
    }, 1000);

    // In real app, you would fetch from your admin panel API
    // fetch('/api/gallery')
    //   .then(res => res.json())
    //   .then(data => {
    //     setImages(data);
    //     setFilteredImages(data);
    //     setLoading(false);
    //   });
  }, []);

  useEffect(() => {
    let filtered = images.filter(img => img.active);

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    setFilteredImages(filtered);
  }, [images, selectedCategory]);

  const categories = ['All', ...new Set(images.map(img => img.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full bg-[#f8fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPurple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-navbar pb-24 w-full bg-[#f8fafc]">
      <h1 className="text-4xl font-extrabold gradient-text text-center mb-6 mt-2">Gallery</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Browse our collection of event photos, student achievements, and campus life.
      </p>

      {/* Category Filter */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-8">
        <div className="glass rounded-xl shadow-glass p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedCategory === category
                  ? 'bg-brandPurple text-white shadow-lg'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
            {filteredImages.map((img, i) => (
              <div
                key={img.id}
                className="mb-8 break-inside-avoid relative group rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-lg border border-white/60 hover:shadow-[0_8px_32px_rgba(132,67,220,0.13)] transition-shadow duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: '4/3', filter: 'brightness(0.98) saturate(1.08)' }}
                  onClick={() => setLightbox(img)}
                />

                {/* Glassmorphic overlay on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/40 backdrop-blur-lg">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass shadow-lg border border-white/30 text-lg font-semibold text-brandPurple mb-2">
                    <FaSearchPlus className="mr-2 text-xl" />
                    {img.caption}
                  </div>
                  <p className="text-sm text-gray-700 text-center px-4">{img.description}</p>
                  <span className="text-xs text-gray-600 mt-2">Click to enlarge</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-brandPurple/90 text-white text-xs rounded-full backdrop-blur-sm">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
          <p className="text-gray-500">
            {selectedCategory !== 'All'
              ? `No images in the "${selectedCategory}" category`
              : 'No gallery images available at the moment'
            }
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setLightbox(null)}>
          <div className="glass border-2 rounded-2xl p-8 shadow-2xl max-w-4xl w-full mx-4 flex flex-col items-center justify-center relative">
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              width={900}
              height={600}
              className="rounded-xl mb-4 max-w-full h-auto"
            />

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{lightbox.caption}</h3>
              <p className="text-gray-300 mb-3">{lightbox.description}</p>
              <span className="px-3 py-1 bg-brandPurple/80 text-white text-sm rounded-full">
                {lightbox.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mt-16">
        <div className="glass rounded-xl shadow-glass p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Share Your Experience?</h2>
          <p className="text-gray-600 mb-6">
            Have photos from our events or classes? We'd love to see them!
            Contact us to share your memories and they might appear in our gallery.
          </p>
          <a
            href="/contact"
            className="animated-btn inline-flex items-center gap-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 
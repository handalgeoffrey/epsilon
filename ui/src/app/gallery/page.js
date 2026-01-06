'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaSearchPlus, FaTimes, FaCamera } from 'react-icons/fa';
import Link from 'next/link';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data
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
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-slate-50 font-sans">

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden text-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-200/30 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-6 animate-fade-in-up">
            <FaCamera className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Campus Life</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in-up delay-100">
            Capturing <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Moments</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Browse our collection of event photos, student achievements, and vibrant campus life.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-300">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === category
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID (Replaced Masonry with Grid) */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-24 z-10">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img, i) => (
              <div
                key={img.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white"
                onClick={() => setLightbox(img)}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full w-fit mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {img.category}
                  </span>
                  <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {img.caption}
                  </h3>
                  <p className="text-white/80 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150 line-clamp-2">
                    {img.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-white hover:text-purple-600">
                  <FaSearchPlus />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <div className="text-6xl mb-4 opacity-50">📷</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No images found</h3>
            <p className="text-slate-500">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <FaTimes className="text-2xl" />
          </button>

          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
          >
            <div className="relative w-full h-auto max-h-[75vh] min-h-[300px] mb-6 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center max-w-2xl px-4">
              <h3 className="text-2xl font-bold text-white mb-2">{lightbox.caption}</h3>
              <p className="text-gray-300 leading-relaxed font-light">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <div className="w-full max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl shadow-xl p-10 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/30 transition-all duration-700"></div>

          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Have photos to share?</h2>
          <p className="text-purple-200 mb-8 max-w-lg mx-auto relative z-10 leading-relaxed">
            We love seeing Epsilon through your eyes. Share your moments from classes, events, or workshops with us!
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300 shadow-lg relative z-10"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
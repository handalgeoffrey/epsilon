'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaSearchPlus, FaTimes, FaCamera } from 'react-icons/fa';
import Link from 'next/link';

import PageBackground from '@/components/PageBackground';

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
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
        <PageBackground />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300 relative overflow-hidden">

      <PageBackground />

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden text-center z-10">
        {/* Abstract Background Elements */}

        <div className="relative z-10 max-w-4xl mx-auto">


          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight animate-fade-in-up delay-100">
            Capturing <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Moments</span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Browse our collection of event photos, student achievements, and vibrant campus life.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-300">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === category
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
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
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                onClick={() => setLightbox(img)}
              >
                <div className="absolute inset-0 bg-white dark:bg-slate-200 transition-colors duration-300"> {/* Image background container */}
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

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
          <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="text-6xl mb-4 opacity-50">📷</div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No images found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {
        lightbox && (
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
        )
      }


    </div >
  );
}
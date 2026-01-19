'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaDownload, FaFilePdf, FaSearch, FaFilter } from 'react-icons/fa';

import PageBackground from '@/components/PageBackground';

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from admin panel API
  const sampleDownloads = [
    {
      id: 1,
      title: 'JEE Mathematics Syllabus',
      description: 'Complete syllabus for JEE Mathematics preparation',
      category: 'Syllabus',
      fileName: 'jee-mathematics-syllabus.pdf',
      fileSize: '2.5 MB',
      uploadDate: '2024-01-15',
      downloads: 156,
      active: true
    },
    {
      id: 2,
      title: 'Practice Test - Quadratic Equations',
      description: 'Comprehensive practice questions on quadratic equations',
      category: 'Practice Tests',
      fileName: 'quadratic-equations-practice.pdf',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-10',
      downloads: 89,
      active: true
    },
    {
      id: 3,
      title: 'Study Notes - Calculus',
      description: 'Detailed notes on calculus fundamentals',
      category: 'Study Materials',
      fileName: 'calculus-notes.pdf',
      fileSize: '3.2 MB',
      uploadDate: '2024-01-08',
      downloads: 234,
      active: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDownloads(sampleDownloads);
      setFilteredDownloads(sampleDownloads);
      setLoading(false);
    }, 1000);

    // In real app, you would fetch from your admin panel API
    // fetch('/api/downloads')
    //   .then(res => res.json())
    //   .then(data => {
    //     setDownloads(data);
    //     setFilteredDownloads(data);
    //     setLoading(false);
    //   });
  }, []);

  useEffect(() => {
    let filtered = downloads.filter(download => download.active);

    if (searchTerm) {
      filtered = filtered.filter(download =>
        download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        download.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(download => download.category === selectedCategory);
    }

    setFilteredDownloads(filtered);
  }, [downloads, searchTerm, selectedCategory]);

  const categories = ['All', ...new Set(downloads.map(d => d.category))];

  const handleDownload = (download) => {
    // In real app, this would trigger actual file download
    console.log(`Downloading: ${download.title}`);
    // You could also track download count here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full">
        <PageBackground />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPurple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading downloads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-navbar pb-24 w-full bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">

      <PageBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text text-center mb-4 mt-8">Downloads</h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Access important resources, syllabus, practice tests, and study materials.
        </p>

        {/* Search and Filter Section */}
        <div className="glass rounded-2xl shadow-lg p-6 mb-10 border border-white/50 dark:border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-amber-500/5 dark:from-purple-500/10 dark:to-amber-500/10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search downloads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Downloads List */}
        {filteredDownloads.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredDownloads.map((download) => (
              <div
                key={download.id}
                className="group relative glass rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-purple-200 dark:hover:border-purple-800/50 bg-white/60 dark:bg-slate-800/60"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaFilePdf className="text-2xl text-red-500 dark:text-red-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate mb-1 pr-4">{download.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mb-2 md:mb-0">{download.description}</p>

                    {/* Metadata Mobile */}
                    <div className="flex md:hidden flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{download.fileSize}</span>
                      <span>•</span>
                      <span>{download.uploadDate}</span>
                    </div>
                  </div>

                  {/* Metadata Desktop & Action */}
                  <div className="flex flex-row md:flex-col lg:flex-row items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                    <div className="hidden md:flex flex-col items-end text-sm text-slate-500 dark:text-slate-400 gap-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{download.category}</span>
                      <div className="flex items-center gap-2">
                        <span>{download.fileSize}</span>
                        <span>•</span>
                        <span>{download.uploadDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(download)}
                      className="btn-primary whitespace-nowrap px-5 py-2.5 text-sm flex-shrink-0 shadow-md group-hover:shadow-purple-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <FaDownload />
                        <span>Download</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 glass rounded-2xl border-dashed border-2 border-slate-300 dark:border-slate-700/50">
            <FaSearch className="text-5xl mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No files found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              We couldn't find any downloads matching your search.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">Looking for something else?</p>
          <Link href="/contact" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
            Contact us for custom materials &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
} 
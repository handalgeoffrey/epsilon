'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaDownload, FaFilePdf, FaSearch, FaFilter } from 'react-icons/fa';

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPurple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading downloads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-navbar pb-24 w-full bg-[#f8fafc]">
      <h1 className="text-4xl font-extrabold gradient-text text-center mb-8">Downloads</h1>

      {/* Search and Filter Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-8">
        <div className="glass rounded-xl shadow-glass p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search downloads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-transparent transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            {filteredDownloads.length} of {downloads.filter(d => d.active).length} files available
          </div>
        </div>
      </div>

      {/* Downloads List */}
      {filteredDownloads.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {filteredDownloads.map((download) => (
              <div key={download.id} className="glass rounded-xl shadow-glass p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <FaFilePdf className="text-2xl text-red-500" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{download.title}</h3>
                    <p className="text-gray-600 mb-3">{download.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="px-3 py-1 bg-brandPurple/10 text-brandPurple rounded-full">
                        {download.category}
                      </span>
                      <span>Size: {download.fileSize}</span>
                      <span>Uploaded: {download.uploadDate}</span>

                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownload(download)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <FaDownload />
                        Download PDF
                      </button>
                      <span className="text-sm text-gray-500">{download.fileName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FaFilePdf className="text-6xl mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No files found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter criteria'
              : 'No downloads available at the moment'
            }
          </p>
        </div>
      )}

      {/* Contact Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mt-12">
        <div className="glass rounded-xl shadow-glass p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Materials?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Contact us for additional study materials,
            custom practice tests, or specific topic notes.
          </p>
          <Link
            href="/contact"
            className="animated-btn inline-flex items-center gap-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 
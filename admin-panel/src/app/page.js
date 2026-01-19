'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaImages,
  FaYoutube,
  FaBullhorn,
  FaDownload,
  FaCamera,
  FaGraduationCap,
  FaCog,
  FaChartLine,
  FaUsers,
  FaVideo
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats] = useState({
    totalCourses: 4,
    totalAnnouncements: 3,
    totalDownloads: 0,
    totalGalleryImages: 2,
    totalHeroImages: 1
  });

  const adminModules = [
    {
      title: 'Hero Management',
      description: 'Manage hero background images and slideshow',
      icon: <FaImages className="text-4xl text-brandPurple" />,
      href: '/hero',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'YouTube Integration',
      description: 'Manage YouTube playlist and latest videos',
      icon: <FaYoutube className="text-4xl text-brandRed" />,
      href: '/youtube',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Announcements',
      description: 'Manage announcement ticker and content',
      icon: <FaBullhorn className="text-4xl text-brandBlue" />,
      href: '/announcements',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Downloads',
      description: 'Upload and manage PDF files',
      icon: <FaDownload className="text-4xl text-brandGreen" />,
      href: '/downloads',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Gallery',
      description: 'Manage gallery images and captions',
      icon: <FaCamera className="text-4xl text-brandGold" />,
      href: '/gallery',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Course Videos',
      description: 'Manage slideshow videos for the Courses page',
      icon: <FaVideo className="text-4xl text-pink-500" />,
      href: '/course-videos',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Courses',
      description: 'Manage courses and faculty information',
      icon: <FaGraduationCap className="text-4xl text-indigo-500" />,
      href: '/courses',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold gradient-text">Epsilon Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCog className="text-xl" />
                <span>Admin Panel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card text-center">
            <FaGraduationCap className="text-3xl text-brandPurple mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalCourses}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="card text-center">
            <FaBullhorn className="text-3xl text-brandBlue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalAnnouncements}</div>
            <div className="text-sm text-gray-600">Announcements</div>
          </div>
          <div className="card text-center">
            <FaDownload className="text-3xl text-brandGreen mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="card text-center">
            <FaCamera className="text-3xl text-brandGold mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalGalleryImages}</div>
            <div className="text-sm text-gray-600">Gallery Images</div>
          </div>
          <div className="card text-center">
            <FaImages className="text-3xl text-brandPurple mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalHeroImages}</div>
            <div className="text-sm text-gray-600">Hero Images</div>
          </div>
        </div>

        {/* Admin Modules */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <Link key={index} href={module.href}>
              <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                <div className="text-center">
                  <div className="mb-4">{module.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brandPurple transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>
                <div className={`mt-4 h-1 bg-gradient-to-r ${module.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

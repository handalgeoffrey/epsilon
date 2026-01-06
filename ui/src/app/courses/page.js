'use client';
import { useState, useEffect } from 'react';
import { FaBookOpen, FaGraduationCap, FaLaptopCode, FaUsers, FaClock, FaRupeeSign, FaArrowRight, FaCheckCircle, FaSearch } from 'react-icons/fa';
import AnimatedTile from "../../components/AnimatedTile";
import ScrollAnimation from "../../components/ScrollAnimation";
import Link from 'next/link';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - fallback if API fails
  const sampleCourses = [
    {
      id: 1,
      title: 'JEE Mathematics',
      description: 'Comprehensive JEE Mathematics preparation course covering all topics from class 11 and 12.',
      icon: '🎓',
      faculty: ['Dr. Rajesh Kumar', 'Prof. Priya Sharma'],
      duration: '2 years',
      price: '₹25,000',
      active: true,
      order: 1,
      features: ['Live Classes', 'Practice Tests', 'Study Material', 'Doubt Sessions']
    },
    {
      id: 2,
      title: 'Keam Mathematics',
      description: 'Specialized course for Kerala Engineering Architecture Medical entrance examination.',
      icon: '📚',
      faculty: ['Prof. Anil Menon'],
      duration: '1.5 years',
      price: '₹18,000',
      active: true,
      order: 2,
      features: ['Live Classes', 'Mock Tests', 'Previous Papers', 'Personal Mentoring']
    },
    {
      id: 3,
      title: 'Plus Two Mathematics',
      description: 'Complete mathematics course for class 11 and 12 students following state board curriculum.',
      icon: '✏️',
      faculty: ['Ms. Lakshmi Devi', 'Mr. Suresh Kumar'],
      duration: '2 years',
      price: '₹15,000',
      active: true,
      order: 3,
      features: ['Regular Classes', 'Chapter Tests', 'Homework Support', 'Exam Preparation']
    },
    {
      id: 4,
      title: 'Engineering Mathematics',
      description: 'Advanced mathematics concepts for engineering students and professionals.',
      icon: '🔬',
      faculty: ['Dr. Manoj Nair', 'Prof. Deepa Thomas'],
      duration: '1 year',
      price: '₹20,000',
      active: true,
      order: 4,
      features: ['Advanced Topics', 'Problem Solving', 'Real Applications', 'Industry Focus']
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Assuming Admin Panel is running on port 3001
        const res = await fetch('http://localhost:3001/api/courses');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(sampleCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const activeCourses = courses
    .filter(course => course.active)
    .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading premium courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-slate-50 font-sans">

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">


          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in-up delay-100">
            Shape Your <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Future</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Explore our meticulously designed mathematics courses. From foundational concepts to advanced problem-solving, we have the perfect path for your success.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative animate-fade-in-up delay-300">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
      </section>

      {/* COURSE GRID */}
      <ScrollAnimation className="w-full max-w-7xl mx-auto px-6 pb-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activeCourses.length > 0 ? (
            activeCourses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => handleCourseClick(course)}
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-amber-50 border border-white shadow-inner flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {course.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FaClock className="text-purple-400" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-slate-900">
                      <FaRupeeSign className="text-amber-500" />
                      {course.price}
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-purple-50 text-purple-700 font-bold text-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    View Details <FaArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              No courses found matching your search.
            </div>
          )}
        </div>
      </ScrollAnimation>

      {/* DETAILED POPUP */}
      {showPopup && selectedCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white/95 backdrop-blur-2xl w-full max-w-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-zoom-in relative">

            {/* Header Gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-amber-500 h-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.2]"></div>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 rounded-full p-2 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 pb-8 -mt-16 relative">
              <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-5xl border-4 border-white mb-6">
                {selectedCourse.icon}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedCourse.title}</h2>
                  <div className="flex gap-3 mt-2">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
                      {selectedCourse.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                      Premium
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Course Fee</p>
                  <p className="text-3xl font-bold text-slate-900">{selectedCourse.price}</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {selectedCourse.description}
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FaGraduationCap className="text-purple-600" />
                  What you'll get
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCourse.features && selectedCourse.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500 min-w-[16px]" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/admission"
                  className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-bold text-center hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Enroll Now
                </Link>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ SECTION */}
      <ScrollAnimation className="w-full max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Common Questions</h2>
        <div className="grid gap-4">
          <AnimatedTile
            title="How are the classes conducted?"
            description="Classes are conducted in small batches with personalized attention to each student. We focus on conceptual understanding and practical problem-solving."
            className="text-left bg-white shadow-sm border border-slate-100"
          />
          <AnimatedTile
            title="What is the batch size?"
            description="We maintain small batch sizes of 8-12 students to ensure individual attention and optimal learning environment."
            className="text-left bg-white shadow-sm border border-slate-100"
          />
          <AnimatedTile
            title="Do you provide study materials?"
            description="Yes, comprehensive study materials, practice worksheets, and mock test papers are provided as part of the course."
            className="text-left bg-white shadow-sm border border-slate-100"
          />
          <AnimatedTile
            title="Can I switch between courses?"
            description="Yes, you can switch between courses based on your academic needs. Contact our admin team for course transfer requests."
            className="text-left bg-white shadow-sm border border-slate-100"
          />
        </div>
      </ScrollAnimation>

    </div>
  );
}
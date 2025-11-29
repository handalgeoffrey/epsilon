'use client';
import { useState, useEffect } from 'react';
import { FaBookOpen, FaGraduationCap, FaLaptopCode, FaUsers, FaClock, FaRupeeSign } from 'react-icons/fa';
import AnimatedTile from "../../components/AnimatedTile";
import ScrollAnimation from "../../components/ScrollAnimation";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const activeCourses = courses.filter(course => course.active).sort((a, b) => a.order - b.order);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPurple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start pt-navbar min-h-screen">
      <div className="w-full py-12 mb-12">
        <h1 className="text-5xl font-extrabold gradient-text text-center mb-4">Our Courses</h1>
        <p className="text-center text-slate-700 max-w-2xl mx-auto px-4 font-medium">
          Choose from our wide range of specialized mathematics courses designed to help you excel in your academic journey.
        </p>
      </div>

      {/* Course Grid */}
      <ScrollAnimation className="w-full max-w-7xl mx-auto mb-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeCourses.map((course) => (
            <div
              key={course.id}
              className="glass bg-white/40 backdrop-blur-md rounded-2xl shadow-glass p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 h-[22rem] flex flex-col justify-between border border-white/50"
              onClick={() => handleCourseClick(course)}
            >
              <div className="text-center flex-1 flex flex-col justify-start">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{course.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight min-h-[3.5rem] flex items-center justify-center">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100/50">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-purple-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRupeeSign className="text-purple-600" />
                    <span className="font-bold text-slate-900">{course.price}</span>
                  </div>
                </div>

                <div className="w-full py-2 rounded-lg bg-purple-50/80 text-purple-700 text-xs font-bold text-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  View Details
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollAnimation>

      {/* Course Details Popup */}
      {showPopup && selectedCourse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass bg-white px-8 py-8 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">{selectedCourse.icon}</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">{selectedCourse.title}</h2>
              <p className="text-slate-600 text-lg">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
                <FaClock className="text-2xl text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Duration</h3>
                <p className="text-slate-600">{selectedCourse.duration}</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <FaRupeeSign className="text-2xl text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Price</h3>
                <p className="text-slate-600 font-bold">{selectedCourse.price}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4 text-center text-lg">Course Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse.features && selectedCourse.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-6">
                To enroll in this course, please contact admin and provide your email.
                After payment, access will be granted.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <ScrollAnimation className="w-full max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <AnimatedTile
            title="How are the classes conducted?"
            description="Classes are conducted in small batches with personalized attention to each student. We focus on conceptual understanding and practical problem-solving."
            className="text-left items-start bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md border border-white/50"
          />
          <AnimatedTile
            title="What is the batch size?"
            description="We maintain small batch sizes of 8-12 students to ensure individual attention and optimal learning environment."
            className="text-left items-start bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md border border-white/50"
          />
          <AnimatedTile
            title="Do you provide study materials?"
            description="Yes, comprehensive study materials, practice worksheets, and mock test papers are provided as part of the course."
            className="text-left items-start bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md border border-white/50"
          />
          <AnimatedTile
            title="Can I switch between courses?"
            description="Yes, you can switch between courses based on your academic needs. Contact our admin team for course transfer requests."
            className="text-left items-start bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md border border-white/50"
          />
          <AnimatedTile
            title="Is there a money-back guarantee?"
            description="We offer a trial period for all courses. If you're not satisfied within the first week, we provide a full refund."
            className="text-left items-start bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md border border-white/50"
          />
        </div>
      </ScrollAnimation>
    </div>
  );
}
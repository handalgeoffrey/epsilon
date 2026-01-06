'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaGraduationCap, FaChalkboardTeacher, FaUsers, FaBookOpen, FaVideo, FaYoutube } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseVideos, setCourseVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // View State: 'courses' or 'videos'
  const [activeTab, setActiveTab] = useState('courses');

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    icon: '🎓',
    faculty: [],
    duration: '',
    price: '',
    features: []
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    videoId: ''
  });

  const icons = ['🎓', '📚', '✏️', '🔬', '🧮', '📊', '🎯', '🚀', '💡', '🏆'];

  useEffect(() => {
    fetchCourses();
    fetchCourseVideos();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const fetchCourseVideos = async () => {
    try {
      const res = await fetch('/api/course-videos');
      const data = await res.json();
      setCourseVideos(data || []);
    } catch (error) {
      // Silent fail or toast
    }
  };

  const handleCourseSubmit = async () => {
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingCourseId) {
        // Update existing course
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update',
            course: { ...courseForm, id: editingCourseId, active: true, order: 1 } // Preserving simple fields for now
          })
        });
        if (res.ok) {
          toast.success('Course updated successfully');
          fetchCourses();
        }
      } else {
        // Add new course
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create',
            course: courseForm
          })
        });
        if (res.ok) {
          toast.success('Course added successfully');
          fetchCourses();
        }
      }

      setCourseForm({ title: '', description: '', icon: '🎓', faculty: [], duration: '', price: '', features: [] });
      setShowCourseForm(false);
      setEditingCourseId(null);
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleVideoSubmit = async () => {
    if (!videoForm.title || !videoForm.videoId) {
      toast.error('Please enter title and Video ID');
      return;
    }

    // Basic thumbnail construction
    const thumbnail = `https://img.youtube.com/vi/${videoForm.videoId}/maxresdefault.jpg`;

    try {
      const res = await fetch('/api/course-videos', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create',
          video: {
            title: videoForm.title,
            videoId: videoForm.videoId,
            thumbnail,
            publishedAt: new Date().toISOString().split('T')[0],
            duration: 'Manual', // We don't fetch duration in manual mode
            views: 'N/A'
          }
        })
      });

      if (res.ok) {
        toast.success('Video added manually');
        setVideoForm({ title: '', videoId: '' });
        setShowVideoForm(false);
        fetchCourseVideos();
      }
    } catch (error) {
      toast.error('Failed to add video');
    }
  };

  const deleteVideo = async (id) => {
    if (!confirm('Remove this video?')) return;
    try {
      const res = await fetch('/api/course-videos', {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', id })
      });
      if (res.ok) {
        toast.success('Video removed');
        fetchCourseVideos();
      }
    } catch (e) {
      toast.error('Failed to remove video');
    }
  };

  const editCourse = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      icon: course.icon,
      faculty: course.faculty || [],
      duration: course.duration,
      price: course.price,
      features: course.features || []
    });
    setEditingCourseId(course.id);
    setShowCourseForm(true);
  };

  const deleteCourse = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      if (res.ok) {
        toast.success('Course deleted successfully');
        fetchCourses();
      }
    } catch (error) {
      toast.error('Failed to delete course');
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
              <FaGraduationCap className="text-3xl text-indigo-500" />
              <h1 className="text-3xl font-bold gradient-text">Courses Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('courses')}>
            <div className={`text-3xl mx-auto mb-2 ${activeTab === 'courses' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <FaBookOpen />
            </div>
            <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
            <div className={`text-sm ${activeTab === 'courses' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>Total Courses</div>
          </div>
          <div className="card text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('videos')}>
            <div className={`text-3xl mx-auto mb-2 ${activeTab === 'videos' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <FaVideo />
            </div>
            <div className="text-2xl font-bold text-gray-900">{courseVideos.length}</div>
            <div className={`text-sm ${activeTab === 'videos' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>Promo Videos</div>
          </div>
        </div>

        {/* Tab Navigation (Visual) */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-bold text-lg border-b-2 transition-colors ${activeTab === 'courses' ? 'border-brandPurple text-brandPurple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses List
          </button>
          <button
            className={`py-3 px-6 font-bold text-lg border-b-2 transition-colors ${activeTab === 'videos' ? 'border-brandPurple text-brandPurple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('videos')}
          >
            Promo Videos (Slideshow)
          </button>
        </div>


        {/* === COURSES TAB === */}
        {activeTab === 'courses' && (
          <div className="card mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
              <button
                onClick={() => setShowCourseForm(!showCourseForm)}
                className="btn-primary flex items-center gap-2"
              >
                <FaPlus />
                Add New Course
              </button>
            </div>

            {showCourseForm && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title
                      </label>
                      <input
                        type="text"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter course title"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Icon
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {icons.map((icon, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCourseForm(prev => ({ ...prev, icon }))}
                            className={`p-2 text-2xl rounded-lg border-2 transition-colors ${courseForm.icon === icon
                              ? 'border-brandPurple bg-brandPurple/10'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={courseForm.description}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter course description"
                      rows={3}
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g., 2 years"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        value={courseForm.price}
                        onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g., ₹25,000"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCourseSubmit}
                      className="btn-primary"
                    >
                      {editingCourseId ? 'Update Course' : 'Add Course'}
                    </button>
                    <button
                      onClick={() => {
                        setShowCourseForm(false);
                        setEditingCourseId(null);
                        setCourseForm({ title: '', description: '', icon: '🎓', faculty: [], duration: '', price: '', features: [] });
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{course.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-brandPurple">{course.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editCourse(course)}
                        className="flex-1 btn-primary text-sm py-2"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === VIDEOS TAB === */}
        {activeTab === 'videos' && (
          <div className="card mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Course Promo Videos</h2>
                <p className="text-sm text-gray-500">These videos will appear in the slideshow on the Courses page.</p>
              </div>
              <button
                onClick={() => setShowVideoForm(!showVideoForm)}
                className="btn-primary flex items-center gap-2"
              >
                <FaPlus />
                Add Video (Manual)
              </button>
            </div>

            {showVideoForm && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 bg-gray-50">
                <h3 className="font-bold mb-4">Add New Video</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Video Title</label>
                    <input
                      className="input-field"
                      placeholder="e.g. Introduction to Calculus"
                      value={videoForm.title}
                      onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID</label>
                    <input
                      className="input-field"
                      placeholder="e.g. LJOxnSkNsFQ"
                      value={videoForm.videoId}
                      onChange={e => setVideoForm({ ...videoForm, videoId: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleVideoSubmit} className="btn-primary">Save Video</button>
                  <button onClick={() => setShowVideoForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {courseVideos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No videos added yet. Add one to see it on the Courses page!
                </div>
              ) : (
                courseVideos.map(video => (
                  <div key={video.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <img src={video.thumbnail} alt={video.title} className="w-32 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{video.title}</h4>
                      <p className="text-sm text-gray-500">ID: {video.videoId}</p>
                    </div>
                    <button onClick={() => deleteVideo(video.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg">
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

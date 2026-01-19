'use client';
import { useState, useEffect } from 'react';
import { FaUser, FaSchool, FaUserFriends, FaWhatsapp, FaEnvelope, FaChevronDown, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

import PageBackground from '@/components/PageBackground';

const classes = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Keam Repeater', 'Jee Repeater'];
const syllabi = ['ICSE', 'ISC', 'CBSE', 'HSE', 'Other'];

export default function Admission() {
  const [form, setForm] = useState({
    studentName: '', class: '', syllabus: '', school: '', guardian: '', parentWhatsapp: '', studentWhatsapp: '', email: '', course: ''
  });
  const [courses, setCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState('');

  // Sample data to match Course page fallback
  const sampleCourses = [
    { title: 'JEE Mathematics', active: true },
    { title: 'Keam Mathematics', active: true },
    { title: 'Plus Two Mathematics', active: true },
    { title: 'Engineering Mathematics', active: true }
  ];

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/courses');
        if (res.ok) {
          const data = await res.json();
          setCourses(data.filter(c => c.active));
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        console.warn("Failed to fetch courses from API, using fallback data:", err);
        setCourses(sampleCourses);
      }
    };
    fetchCourses();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.studentName || !form.class || !form.syllabus || !form.school || !form.guardian || !form.parentWhatsapp || !form.email || !form.course) {
      setError('Please fill all required fields, including the Course.');
      return;
    }
    setError('');
    // Here you would typically send 'form' to your backend
    console.log("Submitting Admission Form:", form);

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-navbar pb-12 w-full bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">

      <PageBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">Apply for Admission</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Start your journey towards mathematical excellence. Fill out the form below to register.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass max-w-lg w-full mx-auto px-8 py-10 rounded-3xl shadow-2xl flex flex-col gap-5 border border-white/50 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl relative z-10 transition-colors duration-300">

        {/* Student Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaUser className="text-purple-600 dark:text-purple-400" /> Student Name*</label>
          <input name="studentName" value={form.studentName} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" required placeholder="Enter student name" />
        </div>

        {/* SELECT COURSE DROPDOWN */}
        <div className="flex flex-col gap-2 relative">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaGraduationCap className="text-purple-600 dark:text-purple-400" /> Select Course*</label>
          <div className="relative" tabIndex={0} onBlur={() => setTimeout(() => setOpenDropdown(''), 200)}>
            <button type="button" className={`w-full flex items-center justify-between bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all outline-none ${openDropdown === 'course' ? 'ring-2 ring-purple-200 dark:ring-purple-900 border-purple-500' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'course' ? '' : 'course')}>
              <span className={form.course ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>{form.course || 'Select a Course'}</span>
              <FaChevronDown className={`ml-2 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${openDropdown === 'course' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'course' && (
              <div className="absolute left-0 right-0 mt-2 z-30 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900 max-h-60 overflow-y-auto animate-dropdown-open">
                {courses.length > 0 ? (
                  courses.map(c => (
                    <div key={c.id} className="px-5 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer text-slate-700 dark:text-slate-300 font-medium transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none flex items-center justify-between"
                      onMouseDown={() => { setForm(f => ({ ...f, course: c.title })); setOpenDropdown(''); }}>
                      {c.title}
                      {c.active && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Open</span>}
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-3 text-slate-400 text-sm">Loading courses...</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Custom Dropdown for Class */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaUserFriends className="text-purple-600 dark:text-purple-400" /> Class*</label>
            <div className="relative" tabIndex={0} onBlur={() => setTimeout(() => setOpenDropdown(''), 200)}>
              <button type="button" className={`w-full flex items-center justify-between bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all outline-none ${openDropdown === 'class' ? 'ring-2 ring-purple-200 dark:ring-purple-900 border-purple-500' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'class' ? '' : 'class')}>
                <span className={form.class ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>{form.class || 'Class'}</span>
                <FaChevronDown className={`ml-1 text-purple-600 dark:text-purple-400 text-sm transition-transform duration-300 ${openDropdown === 'class' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'class' && (
                <div className="absolute left-0 right-0 mt-2 z-30 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900 animate-dropdown-open">
                  {classes.map(c => (
                    <div key={c} className="px-5 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer text-slate-700 dark:text-slate-300 font-medium transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none" onMouseDown={() => { setForm(f => ({ ...f, class: c })); setOpenDropdown(''); }}>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Custom Dropdown for Syllabus */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaBookOpen className="text-purple-600 dark:text-purple-400" /> Syllabus*</label>
            <div className="relative" tabIndex={0} onBlur={() => setTimeout(() => setOpenDropdown(''), 200)}>
              <button type="button" className={`w-full flex items-center justify-between bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all outline-none ${openDropdown === 'syllabus' ? 'ring-2 ring-purple-200 dark:ring-purple-900 border-purple-500' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'syllabus' ? '' : 'syllabus')}>
                <span className={form.syllabus ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>{form.syllabus || 'Syllabus'}</span>
                <FaChevronDown className={`ml-1 text-purple-600 dark:text-purple-400 text-sm transition-transform duration-300 ${openDropdown === 'syllabus' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'syllabus' && (
                <div className="absolute left-0 right-0 mt-2 z-30 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900 animate-dropdown-open">
                  {syllabi.map(s => (
                    <div key={s} className="px-5 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer text-slate-700 dark:text-slate-300 font-medium transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none" onMouseDown={() => { setForm(f => ({ ...f, syllabus: s })); setOpenDropdown(''); }}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaSchool className="text-purple-600 dark:text-purple-400" /> School Name*</label>
          <input name="school" value={form.school} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" required placeholder="Enter school name" />
        </div>

        {/* Guardian Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaUserFriends className="text-purple-600 dark:text-purple-400" /> Guardian Name*</label>
          <input name="guardian" value={form.guardian} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" required placeholder="Enter guardian name" />
        </div>

        {/* Parent WhatsApp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaWhatsapp className="text-purple-600 dark:text-purple-400" /> Parent WhatsApp Number*</label>
          <input name="parentWhatsapp" value={form.parentWhatsapp} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" required placeholder="Enter parent WhatsApp number" />
        </div>

        {/* Student WhatsApp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaWhatsapp className="text-purple-600 dark:text-purple-400" /> Student WhatsApp Number</label>
          <input name="studentWhatsapp" value={form.studentWhatsapp} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" placeholder="Enter student WhatsApp number" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FaEnvelope className="text-purple-600 dark:text-purple-400" /> Email*</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-4 py-3 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-slate-900 dark:text-white transition-all outline-none" required placeholder="Enter email address" />
        </div>

        {error && <div className="text-red-500 font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</div>}

        <button type="submit" className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300 text-lg">
          Submit Application
        </button>

        {submitted && (
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 text-center animate-fade-in-up z-40 border border-white/20 dark:border-white/5">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-3xl mb-4">
              <FaBookOpen />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Received!</h3>
            <p className="text-slate-600 dark:text-slate-300">Thank you for applying. Our team will contact you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-purple-600 dark:text-purple-400 font-semibold hover:underline">Submit another response</button>
          </div>
        )}
      </form>
      <style jsx>{`
        @keyframes dropdown-open {
          0% { opacity: 0; transform: scaleY(0.95) translateY(-10px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        .animate-dropdown-open {
          animation: dropdown-open 0.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}
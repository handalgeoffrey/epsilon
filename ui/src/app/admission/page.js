'use client';
import { useState } from 'react';
import { FaUser, FaSchool, FaUserFriends, FaWhatsapp, FaEnvelope, FaChevronDown, FaBookOpen } from 'react-icons/fa';

const classes = ['Class 10', 'Class 11', 'Class 12', 'Other'];
const syllabi = ['ICSE', 'ISC', 'CBSE', 'HSE', 'Other'];

export default function Admission() {
  const [form, setForm] = useState({
    studentName: '', class: '', syllabus: '', school: '', guardian: '', parentWhatsapp: '', studentWhatsapp: '', email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.studentName || !form.class || !form.syllabus || !form.school || !form.guardian || !form.parentWhatsapp || !form.email) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-navbar pb-12 w-full bg-[#f8fafc]">
      <h1 className="text-4xl font-extrabold gradient-text text-center mb-8">Admission</h1>
      <form onSubmit={handleSubmit} className="glass max-w-lg w-full mx-auto px-8 py-10 rounded-2xl shadow-2xl flex flex-col gap-6 motion-fade-in border-2" style={{ borderImage: 'linear-gradient(90deg, #8443dc, #dfa720) 1', borderWidth: 2, borderStyle: 'solid' }}>
        {/* Student Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaUser className="text-brandPurple" /> Student Name*</label>
          <input name="studentName" value={form.studentName} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" required placeholder="Enter student name" />
        </div>
        {/* Custom Dropdown for Class */}
        <div className="flex flex-col gap-2 relative">
          <label className="font-semibold flex items-center gap-2"><FaUserFriends className="text-brandPurple" /> Class*</label>
          <div className="relative" tabIndex={0} onBlur={() => setOpenDropdown('')}>
            <button type="button" className={`w-full flex items-center justify-between bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all ${openDropdown === 'class' ? 'ring-2 ring-brandPurple/30 border-brandPurple' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'class' ? '' : 'class')}>
              <span>{form.class || 'Select Class'}</span>
              <FaChevronDown className={`ml-2 text-brandPurple transition-transform duration-300 ${openDropdown === 'class' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'class' && (
              <div className="absolute left-0 right-0 mt-2 z-20 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-brandPurple/20 animate-dropdown-open">
                {classes.map(c => (
                  <div key={c} className="px-6 py-3 hover:bg-brandPurple/10 cursor-pointer text-brandPurple text-base font-semibold transition-all glass" onMouseDown={() => { setForm(f => ({ ...f, class: c })); setOpenDropdown(''); }}>
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Custom Dropdown for Syllabus */}
        <div className="flex flex-col gap-2 relative">
          <label className="font-semibold flex items-center gap-2"><FaBookOpen className="text-brandPurple" /> Syllabus*</label>
          <div className="relative" tabIndex={0} onBlur={() => setOpenDropdown('')}>
            <button type="button" className={`w-full flex items-center justify-between bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all ${openDropdown === 'syllabus' ? 'ring-2 ring-brandPurple/30 border-brandPurple' : ''}`} onClick={() => setOpenDropdown(openDropdown === 'syllabus' ? '' : 'syllabus')}>
              <span>{form.syllabus || 'Select Syllabus'}</span>
              <FaChevronDown className={`ml-2 text-brandPurple transition-transform duration-300 ${openDropdown === 'syllabus' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'syllabus' && (
              <div className="absolute left-0 right-0 mt-2 z-20 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-brandPurple/20 animate-dropdown-open">
                {syllabi.map(s => (
                  <div key={s} className="px-6 py-3 hover:bg-brandPurple/10 cursor-pointer text-brandPurple text-base font-semibold transition-all glass" onMouseDown={() => { setForm(f => ({ ...f, syllabus: s })); setOpenDropdown(''); }}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* School Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaSchool className="text-brandPurple" /> School Name*</label>
          <input name="school" value={form.school} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" required placeholder="Enter school name" />
        </div>
        {/* Guardian Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaUserFriends className="text-brandPurple" /> Guardian Name*</label>
          <input name="guardian" value={form.guardian} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" required placeholder="Enter guardian name" />
        </div>
        {/* Parent WhatsApp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaWhatsapp className="text-brandPurple" /> Parent WhatsApp Number*</label>
          <input name="parentWhatsapp" value={form.parentWhatsapp} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" required placeholder="Enter parent WhatsApp number" />
        </div>
        {/* Student WhatsApp */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaWhatsapp className="text-brandPurple" /> Student WhatsApp Number</label>
          <input name="studentWhatsapp" value={form.studentWhatsapp} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" placeholder="Enter student WhatsApp number" />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaEnvelope className="text-brandPurple" /> Email*</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="bg-white/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 transition-all" required placeholder="Enter email address" />
        </div>
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
        <button type="submit" className="btn-primary w-full mt-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Submit Application</button>
        {submitted && <div className="text-green-600 font-semibold mt-2 text-center">Application submitted! (Demo only)</div>}
      </form>
      <style jsx>{`
        @keyframes dropdown-open {
          0% { opacity: 0; transform: scaleY(0.95) translateY(-10px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        .animate-dropdown-open {
          animation: dropdown-open 0.25s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}
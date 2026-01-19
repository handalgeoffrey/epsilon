'use client';
import { FaWhatsapp, FaFacebook, FaInstagram, FaUser, FaEnvelope, FaPhone, FaCommentDots, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

import PageBackground from '@/components/PageBackground';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-navbar w-full bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">

      <PageBackground />

      {/* Hero Banner */}
      <div className="w-full flex flex-col items-center justify-center py-12 mb-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text text-center z-10">Contact Us</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mt-4 z-10">Get in touch for any queries about our courses or admissions. We’re here to help you succeed!</p>
      </div>
      {/* Main Card */}
      <div className="w-full max-w-5xl mx-auto glass shadow-2xl rounded-3xl px-0 py-0 flex flex-col md:flex-row items-stretch overflow-hidden motion-fade-in relative">
        {/* Blurred SVG background shape */}
        <svg className="absolute -top-24 -left-24 w-96 h-96 opacity-10 -z-10" viewBox="0 0 400 400"><circle cx="200" cy="200" r="180" fill="#8443dc" /></svg>
        {/* Contact Info Column */}
        <div className="flex-1 flex flex-col gap-6 px-8 py-12 md:py-16 justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brandPurple to-brandGold flex items-center justify-center shadow-lg mb-2 overflow-hidden relative">
              <Image
                src="/epsilon/logo.png"
                alt="Epsilon Centre Logo"
                width={64}
                height={64}
                className="object-cover rounded-full dark:hidden"
              />
              <Image
                src="/epsilon/logowt.png"
                alt="Epsilon Centre Logo"
                width={64}
                height={64}
                className="object-cover rounded-full hidden dark:block"
              />
            </div>
            <div className="font-bold text-xl gradient-text">Epsilon Centre</div>
          </div>
          <div className="flex flex-col gap-4 text-base dark:text-gray-200">
            <div className="flex items-center gap-3"><FaEnvelope className="text-brandPurple" /><span className="font-semibold">Email:</span> <span className="text-brandGold">epsilontrivandrum@gmail.com</span></div>
            <div className="flex items-center gap-3"><FaPhone className="text-brandPurple" /><span className="font-semibold">Phone:</span> <span className="text-brandGold">7736556277</span>, <span className="text-brandGold">9778797330</span></div>
            <div className="flex items-start gap-3"><FaMapMarkerAlt className="text-brandPurple mt-1" /><span className="font-semibold">Address:</span> <span>Epsilon Centre For Quality Studies,<br />opp Credence Hospital, ulloor,<br /> Trivandrum, Kerala 695011</span></div>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=917736556277&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="animated-btn flex items-center justify-center gap-2 mt-6 w-full">
            <FaWhatsapp className="text-2xl" /> Chat on WhatsApp
          </a>
          <div className="flex items-center gap-4 mt-4 justify-center">
            <a href="https://www.facebook.com/Epsilontvm" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition-transform" /></a>
            <a href="https://www.instagram.com/epsilon.trivandrum/" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform" /></a>
          </div>
        </div>
        {/* Divider for desktop */}
        <div className="hidden md:block w-0.5 bg-gradient-to-b from-brandPurple via-brandGold to-brandPurple opacity-30" />
        {/* Contact Form Column */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 px-8 py-12 md:py-16 justify-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg">
          <h2 className="text-2xl font-bold gradient-text mb-2 text-center">Send Us a Message</h2>
          <div className="flex flex-col gap-2">
            <label className="font-semibold flex items-center gap-2 dark:text-gray-200"><FaUser className="text-brandPurple" /> Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 dark:text-white transition-all outline-none" required placeholder="Enter your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold flex items-center gap-2 dark:text-gray-200"><FaEnvelope className="text-brandPurple" /> Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 dark:text-white transition-all outline-none" required placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold flex items-center gap-2 dark:text-gray-200"><FaPhone className="text-brandPurple" /> Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 dark:text-white transition-all outline-none" required placeholder="Enter your phone number" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold flex items-center gap-2 dark:text-gray-200"><FaCommentDots className="text-brandPurple" /> Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/30 dark:text-white transition-all min-h-[120px] resize-none outline-none" required placeholder="Type your message here..." />
          </div>
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          <button type="submit" className="btn-primary mt-2 w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Send Message</button>
          {submitted && <div className="flex items-center gap-2 text-green-600 font-semibold mt-2 text-center justify-center"><FaCheckCircle className="text-xl" /> Message sent! (Demo only)</div>}
        </form>
      </div>
    </div>
  );
} 
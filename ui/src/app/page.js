'use client';
import Image from "next/image";
import AnimatedTile from "../components/AnimatedTile";
import ScrollAnimation from "../components/ScrollAnimation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LuGraduationCap,
  LuTrendingUp,
  LuUsers,
  LuAward,
  LuBookOpen,
  LuPuzzle,
  LuClipboardCheck,
  LuStar,
  LuPlayCircle,
  LuArrowRight,
  LuCircleCheck
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const announcements = [
    { id: 1, text: 'Admissions open for classes 10, 11, 12 — enroll now!', emoji: '🎓' },
    { id: 2, text: 'Free trial classes available — book your slot today.', emoji: '🎉' },
    { id: 3, text: 'New video just dropped — mastering quadratic equations.', emoji: '📚' }
  ];

  const heroImages = [
    { id: 1, src: '/porsche.jpg', alt: 'Hero Background' }
  ];

  return (
    <div className="w-full flex flex-col font-sans">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages[0].src}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-20">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 text-purple-700 font-medium text-sm mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              New Batches Starting Soon
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold leading-tight text-slate-900 mb-6 tracking-tight">
              Excel in <span className="text-gradient">Mathematics</span><br />
              with Epsilon.
            </h1>

            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-lg">
              From zero to infinity, we build the confidence and skills you need to master mathematics. Join the community of achievers today.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                Start Your Journey <LuArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/courses" className="btn-secondary flex items-center gap-2">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT BAR */}
      <div className="w-full bg-white border-y border-slate-200 py-4 overflow-hidden relative z-20 shadow-sm">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...announcements, ...announcements, ...announcements].map((item, i) => (
              <div key={i} className="inline-flex items-center mx-8 text-slate-700 font-medium">
                <span className="mr-3 text-xl">{item.emoji}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <ScrollAnimation className="w-full py-16 bg-white relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<LuUsers />} number="1000+" label="Students Taught" />
            <StatCard icon={<LuTrendingUp />} number="95%" label="Success Rate" />
            <StatCard icon={<LuGraduationCap />} number="10+" label="Expert Tutors" />
            <StatCard icon={<LuAward />} number="12+" label="Years Experience" />
          </div>
        </div>
      </ScrollAnimation>

      {/* WHY CHOOSE EPSILON */}
      <ScrollAnimation className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Choose <span className="text-purple-600">Epsilon?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We don't just teach formulas; we teach you how to think. Our comprehensive approach ensures that every student builds a strong foundation for academic success.
              </p>

              <div className="space-y-6">
                <FeatureRow icon={<LuCircleCheck />} title="Expert Instructors" desc="Learn from the best in the field with proven track records." />
                <FeatureRow icon={<LuCircleCheck />} title="Personalized Learning" desc="Tailored strategies to meet your specific learning needs." />
                <FeatureRow icon={<LuCircleCheck />} title="Regular Assessments" desc="Continuous feedback to track and improve your progress." />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      <LuPuzzle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Problem Solving Focus</h3>
                      <p className="text-slate-600 mt-1">Emphasis on developing strong analytical skills.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-100"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                      <LuBookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Comprehensive Curriculum</h3>
                      <p className="text-slate-600 mt-1">Covering NCERT, ISC, and SAT mathematics.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-100"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <LuStar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Success Guarantee</h3>
                      <p className="text-slate-600 mt-1">Our methodology ensures consistent improvement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* ADMISSION CTA */}
      <ScrollAnimation className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-amber-900/50"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Excel in Mathematics?
          </h2>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Join hundreds of successful students who have transformed their mathematical understanding with Epsilon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/admission" className="px-8 py-4 rounded-full bg-white text-purple-900 font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg">
              Apply for Admission
            </a>
            <a href="/contact" className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </ScrollAnimation>

      {/* LATEST VIDEOS */}
      <ScrollAnimation className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Latest Videos</h2>
              <p className="text-slate-600 mt-2">Watch our latest tutorials and problem-solving sessions.</p>
            </div>
            <Link href="https://youtube.com" target="_blank" className="hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700">
              View Channel <LuArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/videoseries?list=${process.env.NEXT_PUBLIC_YT_PLAYLIST_ID || 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG'}`}
                title="YouTube playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://api.whatsapp.com/send/?phone=917736556277&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

function StatCard({ icon, number, label }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group">
      <div className="text-4xl text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{number}</div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-purple-600 text-xl">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

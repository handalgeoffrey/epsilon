'use client';
import Image from "next/image";
import AnimatedTile from "../components/AnimatedTile";
import ScrollAnimation from "../components/ScrollAnimation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  LuCircleCheck,
  LuExternalLink
} from "react-icons/lu";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [latestVideo, setLatestVideo] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/videos');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setLatestVideo(data[0]); // Use the first video as the latest
          }
        }
      } catch (error) {
        console.error('Failed to fetch latest video');
      }
    };
    fetchLatestVideo();
  }, []);

  const announcements = [
    { id: 1, text: 'Admissions open for classes 10, 11, 12 — enroll now!', emoji: '🎓' },
    { id: 2, text: 'Free trial classes available — book your slot today.', emoji: '🎉' },
    { id: 3, text: 'New video just dropped — mastering quadratic equations.', emoji: '📚' }
  ];

  const heroImages = [
    { id: 1, src: '/epsilon/porsche.jpg', alt: 'Hero Background' }
  ];

  // Reviews Data
  const reviews = [
    {
      id: 1,
      name: "Abhinav Nair",
      initial: "A",
      bg: "bg-orange-100",
      text: "text-orange-700",
      time: "2 months ago",
      content: "Epsilon is hands down the best place for math in Trivandrum. The faculty makes even the hardest calculus problems seem simple. Highly recommended for JEE aspirants!"
    },
    {
      id: 2,
      name: "Sarah Thomas",
      initial: "S",
      bg: "bg-purple-100",
      text: "text-purple-700",
      time: "1 month ago",
      content: "My daughter's grades improved significantly after joining. The personal attention she gets here is unmatched. Thank you, Epsilon team!"
    },
    {
      id: 3,
      name: "Rahul K.",
      initial: "R",
      bg: "bg-blue-100",
      text: "text-blue-700",
      time: "3 weeks ago",
      content: "Professional and result-oriented. The study materials are very detailed, and the regular tests helped me build confidence."
    },
    {
      id: 4,
      name: "Mohammed F.",
      initial: "M",
      bg: "bg-green-100",
      text: "text-green-700",
      time: "5 months ago",
      content: "Best coaching centre. The atmosphere is very conducive to learning. Sir explains concepts from the basics which helps a lot."
    }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Approx card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
            className="object-cover object-bottom"
            priority
          />
          {/* Overlay gradient for readability */}
          {/* Mobile Overlay: Dark Tint */}
          <div className="absolute inset-0 bg-black/60 sm:hidden"></div>
          {/* Desktop Overlay: White Gradient */}
          <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-20 text-center sm:text-left">
          <div className="max-w-2xl mx-auto sm:mx-0 animate-fade-in-up">
            <Link href="/admission" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 sm:bg-white/80 backdrop-blur-sm border border-white/20 sm:border-purple-100 text-white sm:text-purple-700 font-medium text-sm mb-6 shadow-sm hover:scale-105 hover:bg-white/30 sm:hover:bg-white transition-all duration-300 cursor-pointer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 sm:bg-purple-600"></span>
              </span>
              New Batches Starting Soon
            </Link>

            <h1 className="text-5xl sm:text-7xl font-bold leading-tight text-white sm:text-slate-900 mb-6 tracking-tight drop-shadow-md sm:drop-shadow-none">
              Excel in <span className="responsive-gradient-text">Mathematics</span><br />
              with Epsilon.
            </h1>

            <p className="text-xl text-slate-200 sm:text-slate-700 mb-8 leading-relaxed max-w-lg mx-auto sm:mx-0 drop-shadow-sm">
              From zero to infinity, we build the confidence and skills you need to master mathematics. Join the community of achievers today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 py-4 sm:py-3 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
                Book a Free Trial Class <LuArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/courses" className="btn-secondary flex items-center justify-center gap-2 py-4 sm:py-3 bg-white/10 text-white border-white/30 hover:bg-white/20 sm:bg-white sm:text-purple-700 sm:border-slate-200 sm:hover:bg-slate-50">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT BAR */}
      <div className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-4 overflow-hidden relative z-20 shadow-sm hidden sm:block transition-colors duration-300">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...announcements, ...announcements, ...announcements].map((item, i) => (
              <div key={i} className="inline-flex items-center mx-8 text-slate-700 dark:text-slate-300 font-medium">
                <span className="mr-3 text-xl">{item.emoji}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS SECTION (Hidden on mobile) */}
      <ScrollAnimation className="w-full py-16 bg-white dark:bg-slate-950 relative z-10 hidden md:block transition-colors duration-300">
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
      <ScrollAnimation className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Why Choose <span className="text-purple-600 dark:text-purple-400">Epsilon?</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
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
              <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-lg text-purple-600 dark:text-purple-400">
                      <LuPuzzle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Problem Solving Focus</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Emphasis on developing strong analytical skills.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-100 dark:bg-slate-700"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600 dark:text-amber-400">
                      <LuBookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Comprehensive Curriculum</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Covering NCERT, ISC, and SAT mathematics.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-100 dark:bg-slate-700"></div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                      <LuStar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Success Guarantee</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Our methodology ensures consistent improvement.</p>
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
      <ScrollAnimation className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Videos</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Watch our latest tutorials and problem-solving sessions.</p>
            </div>
            <Link href="https://www.youtube.com/@Epsilon_tvm" target="_blank" className="hidden md:flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300">
              View Channel <LuArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${latestVideo ? latestVideo.videoId : 'LJOxnSkNsFQ'}`}
                title="YouTube playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* SUCCESS RATE & REVIEWS (Google Integration Style) */}
      <ScrollAnimation className="py-20 bg-[#f8fafc] dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-12 px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Success Stories
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real feedback from students who transformed their mathematics journey.
            </p>
          </div>

          {/* Manual Carousel Container */}
          <div className="relative w-full px-4 md:px-12">

            {/* Left Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 active:scale-95 transition-all duration-300 hidden md:flex"
              aria-label="Previous Review"
            >
              <LuArrowRight className="w-6 h-6 rotate-180" />
            </button>

            {/* Right Button */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 active:scale-95 transition-all duration-300 hidden md:flex"
              aria-label="Next Review"
            >
              <LuArrowRight className="w-6 h-6" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...reviews, ...reviews].map((review, index) => (
                <div key={`${review.id}-${index}`} className="min-w-[300px] md:min-w-[350px] snap-center">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${review.bg} flex items-center justify-center ${review.text} font-bold text-sm`}>
                            {review.initial}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{review.time}</p>
                          </div>
                        </div>
                        <FcGoogle className="text-xl" />
                      </div>
                      <div className="flex text-amber-400 text-sm mb-3">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        "{review.content}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Indicators (Optional hint) */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {/* Simple dots or just let native swipe handle it */}
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
    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-lg transition-all duration-300 group">
      <div className="text-4xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{number}</div>
      <div className="text-slate-600 dark:text-slate-400 font-medium">{label}</div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-purple-600 dark:text-purple-400 text-xl">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-lg">{title}</h4>
        <p className="text-slate-600 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

'use client';
import { LuTarget, LuEye, LuUser, LuAward, LuBookOpen, LuPuzzle, LuClipboardCheck } from 'react-icons/lu';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-navbar pb-16 w-full bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-100/40 dark:bg-amber-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-4xl mx-auto px-6 text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
          Redefining Excellence in <span className="text-gradient">Mathematics</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Epsilon Centre for Quality Studies has been dedicated to providing high-quality education since 2015. We help students fall in love with the subject and crack competitive examinations with confidence.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-20">
        <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LuTarget className="text-9xl text-purple-600" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <LuTarget className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              To help students understand the concept of maths by laying a base foundation and helping them to face all the problems confidently.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LuEye className="text-9xl text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
              <LuEye className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              To be a premier institution that transforms students into analytical thinkers and problem solvers, preparing them for academic and professional success.
            </p>
          </div>
        </div>
      </div>

      {/* Founder's Message */}
      <div className="w-full bg-white dark:bg-slate-900 py-16 mb-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <LuUser className="text-6xl text-slate-300" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="relative">
                <span className="text-9xl text-purple-100 dark:text-purple-900/40 absolute -top-12 -left-8 font-serif">"</span>
                <p className="text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10 mb-6">
                  I worked as a private tutor and lecturer in Mathematics for almost 5 years after my B-Tech. Within this period, I took classes for B-Tech, BS and Diploma students and hence I am confident enough in taking any UG Mathematics topics. I went on to take MS Mathematics only because of my passion towards the subject and my interest towards teaching that subject.
                  <br /><br />
                  I am a good mentor with an ability to explain tough concepts through easy innovative methods, inspire and motivate students.
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-purple-600"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">ANISH M S</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Founder & Lead Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Our Teaching Methodology</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <MethodologyCard
            icon={<LuPuzzle />}
            title="Interactive Learning"
            desc="Engaging sessions with real-world applications and examples to make abstract concepts concrete."
          />
          <MethodologyCard
            icon={<LuClipboardCheck />}
            title="Regular Assessments"
            desc="Continuous evaluation and feedback loops to track progress and identify areas for improvement."
          />
          <MethodologyCard
            icon={<LuBookOpen />}
            title="Comprehensive Materials"
            desc="Well-structured study materials, formula sheets, and practice tests designed for mastery."
          />
          <MethodologyCard
            icon={<LuAward />}
            title="Doubt Clearing"
            desc="Dedicated sessions for clearing concepts and doubts, ensuring no student is left behind."
          />
        </div>
      </div>
    </div>
  );
}

function MethodologyCard({ icon, title, desc }) {
  return (
    <div className="flex gap-6 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
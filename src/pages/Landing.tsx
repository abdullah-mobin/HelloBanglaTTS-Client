'use client';

import { Mic, Video, Image, BookOpen, Languages, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const items = [
  { to: "/modules/tts", label: "Text to Speech", icon: Mic },
  { to: "/modules/video", label: "Bangla Text to Video", icon: Video },
  { to: "/modules/image", label: "Bangla Text to Image", icon: Image },
  { to: "/modules/story", label: "Story Generator", icon: BookOpen },
  { to: "/modules/accent", label: "Regional Accent", icon: Languages },
  { to: "/modules/smartify", label: "Smartify Text", icon: Sparkles },
  { to: "/modules/humanize", label: "AI Humanizer", icon: UserCheck },
];

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Optional CTA Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to give your Bangla content a voice?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/modules/tts">
              <button  className="rounded-2xl h-14 px-8 shadow-lg bg-blue-600 text-white hover:bg-blue-700">
                Try TTS Now
              </button>
            </Link>
            <Link to="/signup">
              <button  className="rounded-2xl h-14 px-8 text-blue-600 border-2 border-blue-200 hover:bg-blue-50">
                Get Started
              </button>
            </Link>
          </div>
        </div>

      {/* Features Section */}
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">


          <div className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ to, label, icon: Icon }, idx) => (
              <FeatureCard
                key={idx}
                to={to}
                title={label}
                icon={<Icon className="h-6 w-6 md:h-7 md:w-7" />}
                color={getColor(idx)}
              />
            ))}
          </div>
            <div className="text-center mb-12 md:mb-16 space-y-2">
            <p className="text-gray-600 font-medium text-base md:text-lg max-w-2xl mx-auto">
              Convert Bangla text to speech, videos, images, and more — smartly and effortlessly.
            </p>
          </div>
        </div>

        

      </main>

      <Footer />
    </div>
  );
}

// --- Helper Feature Card Component ---
function FeatureCard({ to, icon, title, color }: { to: string; icon: React.ReactNode; title: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600',
    green: 'bg-green-50 text-green-600 border-green-100 group-hover:bg-green-600',
    orange: 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-600',
    purple: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600',
    rose: 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600',
    teal: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600',
  };

  return (
    <div className="group flex flex-col items-center space-y-4 p-6 rounded-[24px] border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className={`p-3 md:p-4 rounded-2xl transition-all duration-300 group-hover:text-white group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight text-center">{title}</h3>
      <Link to={to} className="text-blue-600 font-bold text-sm md:text-base uppercase tracking-widest inline-flex items-center gap-1">
        Explore <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// --- Simple function to assign colors cyclically ---
function getColor(idx: number) {
  const colors = ['blue', 'indigo', 'green', 'orange', 'purple', 'rose', 'teal'];
  return colors[idx % colors.length];
}

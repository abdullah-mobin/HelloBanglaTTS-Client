'use client';

import {
  Mic,
  Video,
  Image,
  BookOpen,
  Languages,
  Sparkles,
  UserCheck,
  ArrowRight
} from 'lucide-react';

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
    <div className="relative flex flex-col min-h-screen overflow-hidden
      bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      {/* Soft Light Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-[140px]" />
      </div>


      {/* Hero / CTA */}
      <section className="relative z-10 mt-8 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
          Give Bangla Content a
          <span className="text-indigo-600"> Human Voice</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10">
          Create natural Bangla speech, videos, images, stories,
          and regional accents using modern AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/modules/tts">
            <button className="h-14 px-8 rounded-2xl bg-indigo-600 text-white
              hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all font-semibold">
              Try TTS Now
            </button>
          </Link>

          <Link to="/signup">
            <button className="h-14 px-8 rounded-2xl border-2 border-indigo-200
              text-indigo-600 hover:bg-indigo-50 transition-all font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <main className="relative z-10 flex-1 py-20 md:py-28">
        <div className="container mx-auto px-6">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ to, label, icon: Icon }, idx) => (
              <FeatureCard
                key={idx}
                to={to}
                title={label}
                icon={<Icon className="h-7 w-7" />}
                color={getColor(idx)}
              />
            ))}
          </div>

          <p className="mt-16 text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Built for developers, educators, creators, and businesses —
            simple APIs, beautiful results.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------------------------- */

function FeatureCard({
  to,
  icon,
  title,
  color
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
    rose: 'bg-rose-100 text-rose-600',
    teal: 'bg-teal-100 text-teal-600',
  };

  return (
    <div className="group rounded-[28px] border border-gray-100 bg-white
      p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

      <div className={`inline-flex p-4 rounded-2xl mb-6 ${colorMap[color]}`}>
        {icon}
      </div>

      <h3 className="text-2xl font-extrabold mb-3">{title}</h3>

      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600
          hover:text-indigo-700 uppercase tracking-widest">
        Explore <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function getColor(idx: number) {
  const colors = ['blue', 'indigo', 'green', 'orange', 'purple', 'rose', 'teal'];
  return colors[idx % colors.length];
}

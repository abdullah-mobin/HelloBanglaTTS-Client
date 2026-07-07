'use client';

import {
  Mic,
  Video,
  Image,
  BookOpen,
  Languages,
  Sparkles,
  UserCheck,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Shield,
  Play,
  Star,
  Quote,
} from "lucide-react";

import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const modules = [
  {
    to: "/modules/tts",
    label: "Text to Speech",
    description:
      "Natural Bangla voices with fine-grained control. Free to try, no signup needed.",
    icon: Mic,
    color: "indigo",
    free: true,
  },
  {
    to: "/modules/video",
    label: "Bangla Text to Video",
    description:
      "Turn Bangla scripts into engaging AI-generated videos in minutes.",
    icon: Video,
    color: "rose",
    free: false,
  },
  {
    to: "/modules/image",
    label: "Bangla Text to Image",
    description:
      "Generate expressive images directly from Bangla prompts.",
    icon: Image,
    color: "teal",
    free: false,
  },
  {
    to: "/modules/story",
    label: "Story Generator",
    description:
      "Create original Bangla stories for writers, kids, and content teams.",
    icon: BookOpen,
    color: "orange",
    free: false,
  },
  {
    to: "/modules/accent",
    label: "Regional Accent",
    description:
      "Speak in true Bangladeshi regional accents — from Sylhet to Chattogram.",
    icon: Languages,
    color: "blue",
    free: false,
  },
  {
    to: "/modules/smartify",
    label: "Smartify Text",
    description:
      "Polish, summarize, or enhance your Bangla writing while preserving meaning.",
    icon: Sparkles,
    color: "purple",
    free: false,
  },
  {
    to: "/modules/humanize",
    label: "AI Humanizer",
    description:
      "Convert robotic AI-written Bangla into natural, human-sounding text.",
    icon: UserCheck,
    color: "green",
    free: false,
  },
];

const valueProps = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized inference delivers high-quality Bangla output in seconds.",
  },
  {
    icon: Globe,
    title: "Built for Bangla",
    desc: "Native Bangla understanding with regional accent awareness.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    desc: "Reliable APIs and clean dashboards for teams and creators.",
  },
];

const testimonials = [
  {
    name: "Rifat Hossain",
    role: "EdTech Founder",
    text: "HelloBanglaTTS made our learning platform feel truly local. The regional accent support is unmatched.",
    avatar: "R",
  },
  {
    name: "Nusrat Jahan",
    role: "Content Creator",
    text: "I narrate Bangla stories every week. The voice quality is clean, warm, and human-like.",
    avatar: "N",
  },
  {
    name: "Tanvir Ahmed",
    role: "Software Engineer",
    text: "Clean APIs, predictable output. We integrated TTS into our product in one afternoon.",
    avatar: "T",
  },
];

export default function Landing() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-white text-gray-900">
      {/* Soft gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 pt-16 md:pt-24 pb-12 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          Built natively for Bangla · v2.0 now live
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
          Give Bangla content a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Human Voice
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10">
          Create natural Bangla speech, videos, images, stories, and regional
          accents using modern AI — built for developers, creators, and
          businesses.
        </p>

        {/* CTA: Try TTS for free + Signup */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/modules/tts">
            <button className="group h-14 px-8 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all font-semibold flex items-center gap-3">
              <Play size={18} className="fill-white" />
              Try TTS Now — Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>

          {!isLoggedIn && (
            <Link to="/signup">
              <button className="h-14 px-8 rounded-2xl border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all font-semibold flex items-center gap-2">
                Create Free Account
              </button>
            </Link>
          )}
        </div>

        <p className="mt-5 text-sm text-gray-500 flex items-center justify-center gap-2">
          <Check size={14} className="text-green-600" />
          No credit card required · Free Bangla TTS with no signup
        </p>
      </section>

      {/* MODULES GRID */}
      <main className="relative z-10 flex-1 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              The full{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                Bangla AI
              </span>{" "}
              toolkit
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Seven production-grade modules in one elegant platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ to, label, description, icon: Icon, color, free }, idx) => (
              <ModuleCard
                key={idx}
                to={to}
                title={label}
                description={description}
                icon={<Icon className="h-7 w-7" />}
                color={color}
                free={free}
              />
            ))}
          </div>
        </div>

        {/* VALUE PROPS */}
        <section className="container mx-auto px-6 mt-24">
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-600 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="container mx-auto px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Loved by creators & developers
            </h2>
            <p className="text-gray-600">
              Trusted by teams across Bangladesh and beyond.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md transition relative"
              >
                <Quote className="absolute top-5 right-5 text-indigo-100" size={42} />
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} className="fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BIG CTA */}
        <section className="container mx-auto px-6 mt-24">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 md:p-16 text-white text-center">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Start with Bangla TTS — free, forever.
              </h2>
              <p className="max-w-2xl mx-auto text-white/90 text-lg mb-8">
                No signup. No credit card. Just type your Bangla text and hear a
                natural voice in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/modules/tts">
                  <button className="h-14 px-8 rounded-2xl bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl transition font-bold flex items-center gap-2">
                    <Play size={18} className="fill-indigo-600" />
                    Try TTS Now
                  </button>
                </Link>
                {!isLoggedIn && (
                  <Link to="/signup">
                    <button className="h-14 px-8 rounded-2xl border-2 border-white/30 hover:bg-white/10 transition font-semibold">
                      Create Free Account
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------------------------- */

function ModuleCard({
  to,
  icon,
  title,
  description,
  color,
  free,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  free: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    rose: "bg-rose-100 text-rose-600",
    teal: "bg-teal-100 text-teal-600",
  };

  return (
    <div className="group relative rounded-[28px] border border-gray-100 bg-white p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {free && (
        <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-widest">
          FREE
        </span>
      )}

      <div className={`inline-flex p-4 rounded-2xl mb-6 ${colorMap[color]}`}>
        {icon}
      </div>

      <h3 className="text-xl font-extrabold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
      >
        {free ? "Try Now" : "Explore"}{" "}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

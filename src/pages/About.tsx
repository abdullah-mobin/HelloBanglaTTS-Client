import Footer from "../components/Footer";
import {
  Mic,
  Video,
  Image,
  BookOpen,
  Languages,
  Sparkles,
  UserCheck,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Bangla Text to Speech",
    desc: "Generate natural-sounding Bangla voice from text with fine-grained audio tuning and developer-friendly APIs.",
  },
  {
    icon: Video,
    title: "Bangla Text to Video",
    desc: "Turn Bangla scripts into engaging AI-generated videos for education, marketing, and storytelling.",
  },
  {
    icon: Image,
    title: "Bangla Text to Image",
    desc: "Create visually expressive images from Bangla prompts using modern generative models.",
  },
  {
    icon: BookOpen,
    title: "Story Generator",
    desc: "Generate creative Bangla stories for children, writers, and content platforms with contextual intelligence.",
  },
  {
    icon: Languages,
    title: "Regional Accent Support",
    desc: "Produce speech with region-aware Bangla accents to reflect local tone, culture, and authenticity.",
  },
  {
    icon: Sparkles,
    title: "Smartify Text",
    desc: "Refine, summarize, or enhance Bangla text while preserving meaning and intent.",
  },
  {
    icon: UserCheck,
    title: "AI Humanizer",
    desc: "Transform robotic AI outputs into more human, emotionally balanced, and natural Bangla language.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <section className="mb-14">
          <h1 className="text-4xl font-bold mb-6">
            About helloBanglaTTS
          </h1>

          <p className="text-lg mb-4 max-w-3xl">
            <strong>helloBanglaTTS</strong> is a modern AI-powered Bangla language
            platform built to serve developers, educators, content creators,
            startups, and enterprises.
          </p>

          <p className="text-lg mb-4 max-w-3xl">
            Our goal is simple: make high-quality Bangla AI tools accessible,
            scalable, and easy to integrate — without unnecessary complexity.
          </p>

          <p className="text-lg max-w-3xl">
            We focus on natural voice output, linguistic accuracy, regional
            awareness, and clean APIs, while keeping the user experience minimal
            and intuitive.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Our Mission
          </h2>
          <p className="text-lg max-w-4xl">
            Bangla is one of the most spoken languages in the world, yet it
            remains underrepresented in high-quality AI tools.  
            helloBanglaTTS exists to bridge that gap by providing reliable,
            production-ready Bangla AI capabilities that developers can trust
            and businesses can scale with confidence.
          </p>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8">
            Platform Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition"
                >
                  <Icon className="w-8 h-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Developers */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Built for Developers
          </h2>
          <p className="text-lg max-w-4xl mb-4">
            helloBanglaTTS is designed with a developer-first mindset.  
            Whether you are building a SaaS product, an educational platform,
            or an internal tool, our APIs are structured to be predictable,
            fast, and easy to integrate.
          </p>

          <ul className="list-disc list-inside text-lg space-y-2">
            <li>REST-based APIs with clear request/response models</li>
            <li>Scalable backend infrastructure</li>
            <li>Fine-grained control over voice and content output</li>
            <li>Ready for production use cases</li>
          </ul>
        </section>

        {/* Closing */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Looking Ahead
          </h2>
          <p className="text-lg max-w-4xl">
            We are continuously improving voice quality, expanding regional
            coverage, and adding intelligent language features.  
            Our long-term vision is to make Bangla AI as capable, expressive,
            and reliable as any global language platform.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

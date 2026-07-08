import { ArrowLeft, Sparkles, Workflow, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Describe your idea",
    description: "Choose a module, type a prompt, or upload a script and let the system understand your goal.",
  },
  {
    title: "Generate output",
    description: "The platform turns your input into polished Bangla voice, image, story, or video output.",
  },
  {
    title: "Refine and publish",
    description: "Review the result, adjust settings, and share it with your audience or teammate.",
  },
];

const highlights = [
  "Fast generation with a polished, user-friendly workflow",
  "Bangla-first prompts and voices that feel native to the language",
  "Flexible controls for tone, pacing, and style",
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
              <Workflow size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">How It Works</p>
              <h1 className="text-3xl font-bold">A simple flow for powerful creation</h1>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-gray-600">
            HelloBanglaTTS combines prompts, models, and smart controls into a guided workflow that helps creators move from idea to finished content with less friction.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                Step {index + 1}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{step.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-purple-600">
              <Zap size={18} />
              <h2 className="text-xl font-semibold">Why it feels effortless</h2>
            </div>
            <div className="space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <h2 className="text-xl font-semibold">Built for speed and clarity</h2>
            </div>
            <p className="mt-3 text-indigo-50">
              The experience is designed to be approachable for first-time users but still flexible enough for teams building polished content pipelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

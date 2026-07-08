import { ArrowLeft, BookOpen, CheckCircle2, MessageSquareText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const checklist = [
  "Sign in to unlock the full workspace experience.",
  "Choose a module such as Text to Speech or Story Generator.",
  "Enter your prompt and review the generated result.",
  "Use the settings panel to refine voice, tone, and output style.",
];

const workflow = [
  { title: "Start simple", text: "Try a short prompt first to see the output quality and format." },
  { title: "Improve the result", text: "Adjust tone, voice, speed, or style until it matches your goal." },
  { title: "Export or share", text: "Save the finished output and reuse it in your project or content pipeline." },
];

export default function UserManual() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">User Manual</p>
              <h1 className="text-3xl font-bold">Quick-start guide for everyday use</h1>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-gray-600">
            This guide helps new users understand the main workflow, discover the strongest features, and get productive quickly without feeling overwhelmed.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">What to do first</h2>
            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <MessageSquareText size={18} />
              <h2 className="text-xl font-semibold">Recommended workflow</h2>
            </div>
            <div className="space-y-3">
              {workflow.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <h2 className="text-xl font-semibold">Pro tip</h2>
          </div>
          <p className="mt-3 max-w-2xl text-emerald-50">
            Clear prompts usually create better results. If you want a more natural voice or richer story, mention tone, audience, and desired length.
          </p>
        </section>
      </div>
    </div>
  );
}

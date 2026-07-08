import { ArrowLeft, BookText, Code2, ServerCog, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const endpoints = [
  { name: "Text to Speech", method: "POST", path: "/v1/tts", description: "Convert Bangla text into natural speech with voice and speed controls." },
  { name: "Story Generation", method: "POST", path: "/v1/story", description: "Create original Bangla stories from a short prompt or topic." },
  { name: "Image Generation", method: "POST", path: "/v1/image", description: "Generate visuals from Bangla prompts with style presets." },
  { name: "Accent Translate", method: "POST", path: "/v1/accent", description: "Rewrite or localize text to reflect regional accent patterns." },
];

const quickStart = `curl -X POST https://api.hellobanglatts.com/v1/tts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"সুপ্রভাত","voice":"bn-female-1","speed":1.0}'`;

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                <BookText size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">API Documentation</p>
                <h1 className="text-3xl font-bold">Developer reference and quick start</h1>
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              Authentication: Bearer token · JSON responses · Sandbox-ready
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-gray-600">
            Use the HelloBanglaTTS APIs to add Bangla voice, text, and content generation features to your app, website, or automation workflow.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-indigo-600">
              <Code2 size={18} />
              <h2 className="text-xl font-semibold">Available endpoints</h2>
            </div>
            <div className="space-y-3">
              {endpoints.map((item) => (
                <div key={item.path} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {item.method}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{item.path}</p>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-indigo-600">
                <ServerCog size={18} />
                <h2 className="text-xl font-semibold">Quick notes</h2>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• API keys are issued per workspace and can be rotated anytime.</li>
                <li>• Responses are returned as JSON payloads with status and metadata.</li>
                <li>• Free plans include basic rate limits while paid tiers unlock higher quotas.</li>
                <li>• Webhooks, retries, and callback support will be documented here soon.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-emerald-600">
                <ShieldCheck size={18} />
                <h2 className="text-xl font-semibold">Security</h2>
              </div>
              <p className="text-sm text-gray-600">
                Keep your API keys private, use HTTPS in production, and verify each response before storing assets.
              </p>
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-indigo-600">
            <Code2 size={18} />
            <h2 className="text-xl font-semibold">Quick start example</h2>
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{quickStart}</pre>
        </section>
      </div>
    </div>
  );
}

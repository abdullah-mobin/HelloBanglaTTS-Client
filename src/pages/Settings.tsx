import { ArrowLeft, Bell, Moon, Settings as SettingsIcon, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const options = [
  { label: "Dark mode", description: "Switch the interface to dark colors.", icon: Moon, defaultEnabled: true },
  { label: "Email notifications", description: "Receive updates about generated content.", icon: Bell, defaultEnabled: false },
  { label: "Privacy mode", description: "Hide advanced diagnostics from the dashboard.", icon: ShieldCheck, defaultEnabled: true },
];

export default function Settings() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(options.map((option) => [option.label, option.defaultEnabled]))
  );
  const [voicePreset, setVoicePreset] = useState("bn-female-1");

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <SettingsIcon size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Settings</p>
              <h1 className="text-3xl font-bold">Personalize your workspace</h1>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-gray-600">
            These controls are lightweight placeholders for a fuller preferences experience, giving you a simple way to shape how the platform feels and behaves.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            {options.map((option) => {
              const Icon = option.icon;
              const active = enabled[option.label];
              return (
                <div key={option.label} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnabled((prev) => ({ ...prev, [option.label]: !prev[option.label] }))}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${active ? "bg-indigo-600" : "bg-slate-200"}`}
                    aria-label={`Toggle ${option.label}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${active ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              );
            })}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-indigo-600">
              <Volume2 size={18} />
              <h2 className="text-xl font-semibold">Voice defaults</h2>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred voice preset
              <select
                value={voicePreset}
                onChange={(event) => setVoicePreset(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-gray-700 outline-none"
              >
                <option value="bn-female-1">Bangla Female 1</option>
                <option value="bn-male-1">Bangla Male 1</option>
                <option value="bn-neutral-1">Bangla Neutral 1</option>
              </select>
            </label>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles size={16} />
                <span className="font-semibold">Suggested setup</span>
              </div>
              <p className="mt-2">
                Use a neutral voice for narration and a warmer preset for storytelling or customer-facing content.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

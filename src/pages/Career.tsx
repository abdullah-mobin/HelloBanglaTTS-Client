import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { openMailClient, CONTACT_EMAIL } from "../services/mailService";

const openings = [
  { title: "Frontend Developer", location: "Remote", type: "Full-time" },
  { title: "Backend Engineer (Go / Node)", location: "Remote", type: "Full-time" },
  { title: "ML Engineer (TTS / NLP)", location: "Remote", type: "Contract" },
];

export default function Careers() {
  const [activeJob, setActiveJob] = useState<(typeof openings)[number] | null>(
    null,
  );

  useEffect(() => {
    if (!activeJob) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveJob(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeJob]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Careers</h1>

        <p className="text-lg mb-10 text-gray-600 dark:text-gray-400">
          Join us in building the future of Bangla voice technology.
          We value craftsmanship, simplicity, and impact.
        </p>

        <div className="space-y-6">
          {openings.map((job) => (
            <div
              key={job.title}
              className="p-6 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-500">
                  {job.location} • {job.type}
                </p>
              </div>

              <button
                onClick={() => setActiveJob(job)}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-500">
          Don’t see a role that fits? Send your CV to{" "}
          <span className="font-medium text-indigo-600">
            careers@hellobanglatts.com
          </span>
        </p>
      </main>

      <Footer />

      {activeJob && (
        <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />
      )}
    </div>
  );
}

function ApplyModal({
  job,
  onClose,
}: {
  job: { title: string; location: string; type: string };
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Application: ${job.title} — ${name}`;
    const body = [
      `Position: ${job.title}`,
      `Location: ${job.location} • ${job.type}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      "",
      "Cover letter:",
      cover,
      "",
      "— Please attach your CV/Resume before sending. —",
    ].join("\n");

    openMailClient({ subject, body });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-1">Apply for {job.title}</h2>
          <p className="text-sm text-gray-500 mb-6">
            {job.location} • {job.type}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Fill in your details and your mail client will open with the
            application ready to send to{" "}
            <span className="font-semibold text-indigo-600">
              {CONTACT_EMAIL}
            </span>
            . You will be asked to attach your CV before sending.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 ..."
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium">Cover Letter</label>
              <textarea
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                required
                placeholder="Tell us a bit about yourself and why you're a good fit…"
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-32"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

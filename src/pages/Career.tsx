import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const openings = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Backend Engineer (Go / Node)",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "ML Engineer (TTS / NLP)",
    location: "Remote",
    type: "Contract",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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

              <button className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
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
    </div>
  );
}

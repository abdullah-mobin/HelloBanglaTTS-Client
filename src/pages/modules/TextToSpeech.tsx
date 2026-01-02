import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AudioPreviewPanel from "../../components/AudioPreviewPanel";


import { useEffect, useState } from "react";
import { Moon, Sun, Lock, Play, Download } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/tts";

export default function LandingPage() {
  const [dark, setDark] = useState(false);
  const [text, setText] = useState("");
  const [actor, setActor] = useState("free_male");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const generateAudio = async () => {
    setLoading(true);
    setAudioUrl(null);
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, actor, format }),
      });
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TEXT INPUT */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold mb-4">Bangla Text to Speech</h1>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="এখানে আপনার বাংলা টেক্সট লিখুন..."
              className="w-full h-64 p-4 rounded-xl border bg-white dark:bg-gray-900 resize-none focus:ring-2 focus:ring-indigo-500"
            />
            <AudioPreviewPanel audioUrl={audioUrl} />
          </div>

          {/* OPTIONS */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div>
              <label className="font-medium">Select Actor</label>
              <select
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border bg-transparent"
              >
                <option value="free_male">Free Male</option>
                <option value="free_female">Free Female</option>
                <option disabled>──────────</option>
                <option disabled>Premium Actor 1 🔒</option>
                <option disabled>Premium Actor 2 🔒</option>
              </select>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Lock size={12} /> Premium voices require signup
              </p>
            </div>

            <div>
              <label className="font-medium">Download Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border bg-transparent"
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="m4a">M4A</option>
              </select>
            </div>

            <button
              disabled={loading || !text}
              onClick={generateAudio}
              className="mt-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Generating…" : "Generate Audio"}
            </button>

            {audioUrl && (
              <div className="border-t pt-4 flex flex-col gap-3">
                <audio controls src={audioUrl} className="w-full" />
                <a
                  href={audioUrl}
                  download={`tts.${format}`}
                  className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

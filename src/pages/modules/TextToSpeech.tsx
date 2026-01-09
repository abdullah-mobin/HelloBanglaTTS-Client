import Footer from "../../components/Footer";
import AudioPreviewPanel from "../../components/AudioPreviewPanel";
import { useAuth } from "../../contexts/AuthContext";

import { useEffect, useState } from "react";
import { Lock, Download } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function TextToSpeech() {
  const { accessToken } = useAuth();
  const [dark] = useState(false);
  const [text, setText] = useState("");
  const [actor, setActor] = useState("free_male");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const generateAudio = async () => {
    setLoading(true);
    setAudioUrl(null);
    setError("");
    setSuccess("");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
      const res = await fetch(`${BACKEND_URL}generate/tts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ 
          text: text, 
          actor: actor, 
          format: format 
        }),
      });

      if (!res.ok) throw new Error("Failed to generate audio");
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
      setSuccess("✓ Audio generated successfully! Ready to download.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error generating audio");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900 flex flex-col">

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TEXT */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold mb-4">
              Bangla Text to Speech
            </h1>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="এখানে আপনার বাংলা টেক্সট লিখুন..."
              className="w-full h-64 p-4 rounded-xl border bg-white dark:bg-gray-900 resize-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* ✅ ONLY AUDIO SYSTEM */}
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
                <option disabled>Saifa 🔒 require premium</option>
                <option disabled>Robin 🔒 require premium</option>
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

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                  ✗ {error}
                </p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  {success}
                </p>
              </div>
            )}

            {/* STATUS INSIGHT */}
            <button
              disabled={loading || !text}
              onClick={generateAudio}
              className="mt-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Generating…" : "Generate Audio"}
            </button>

            {audioUrl && (
              <a
                href={audioUrl}
                download={`generated_audio.${format}`}
                className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Download size={16} /> Download
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

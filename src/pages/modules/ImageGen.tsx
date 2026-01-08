import { useState } from "react";
import Footer from "../../components/Footer";
import { Image as ImageIcon, Download, Lock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ImageGen() {
  const { accessToken } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setImageUrl(null);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
      const res = await fetch(`${BACKEND_URL}generate/image`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text: prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate image");
      const data = await res.json();
      setImageUrl(data.data.image_url || data.image_url);
      setSuccess("Image generated successfully!");
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error generating image");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bangla Text to Image AI
        </h1>
        <p className="text-gray-500 mb-8">
          Generate stunning AI images using Bangla text prompts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: PROMPT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <label className="font-medium mb-2">
              Bangla Prompt
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="সবুজ ধানক্ষেত, নীল আকাশ আর একটি ছোট কুঁড়েঘর..."
              className="w-full h-48 p-4 rounded-xl border bg-transparent resize-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={!prompt || loading}
              onClick={handleGenerate}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ImageIcon size={18} />
              {loading ? "Generating…" : "Generate Image"}
            </button>

            <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
              <Lock size={12} />
              Image generation may require credits
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
            {!imageUrl && (
              <div className="w-full h-64 rounded-xl border border-dashed flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={40} />
                <p className="mt-3 text-sm">
                  Generated image will appear here
                </p>
              </div>
            )}

            {imageUrl && (
              <>
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="rounded-xl max-h-64 object-contain"
                />

                <a
                  href={imageUrl}
                  download="bangla-ai-image.png"
                  className="mt-4 flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Download size={16} />
                  Download
                </a>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Image as ImageIcon, Download, Lock } from "lucide-react";

export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = () => {
    setLoading(true);
    setImageUrl(null);

    // backend hook will go here
    setTimeout(() => {
      setImageUrl("https://picsum.photos/600/400"); // demo placeholder
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bangla Image AI
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

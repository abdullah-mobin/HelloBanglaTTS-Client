import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BookOpen, Loader2, Download } from "lucide-react";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/bigscience/bloom-560m";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

export default function StoryGen() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory("");

    try {
      const res = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `একটি সুন্দর বাংলা গল্প লিখো:\n${prompt}`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.8,
            top_p: 0.9,
          },
        }),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setStory(data[0].generated_text);
      } else {
        setStory("গল্প তৈরি করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      setStory("কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bangla Story Generator
        </h1>
        <p className="text-gray-500 mb-8">
          Generate creative Bangla stories using AI.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <label className="font-medium mb-2">
              Story Prompt (Bangla)
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="একজন জেলের জীবন আর নদীর গল্প..."
              className="w-full h-48 p-4 rounded-xl border bg-transparent resize-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={!prompt || loading}
              onClick={generateStory}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating…
                </>
              ) : (
                <>
                  <BookOpen size={18} />
                  Generate Story
                </>
              )}
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-semibold mb-3">Generated Story</h3>

            {!story && (
              <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
                Your story will appear here
              </div>
            )}

            {story && (
              <>
                <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
                  {story}
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(story)}
                  className="mt-4 border rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Download size={14} className="inline mr-2" />
                  Copy Story
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

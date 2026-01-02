import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Languages, Loader2, Download } from "lucide-react";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/bigscience/bloom-560m";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

const ACCENTS = [
  { value: "dhaka", label: "Dhaka (Standard Urban)" },
  { value: "chattogram", label: "Chattogram" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "khulna", label: "Khulna" },
  { value: "barishal", label: "Barishal" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
  { value: "noakhali", label: "Noakhali (Informal)" },
];

export default function AccentTranslate() {
  const [text, setText] = useState("");
  const [accent, setAccent] = useState("dhaka");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const translateAccent = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `
নিচের বাংলা লেখাটিকে বাংলাদেশের "${accent}" অঞ্চলের কথ্য ভাষা ও আঞ্চলিক ভঙ্গিতে লিখো।
অর্থ অপরিবর্তিত থাকবে, তবে শব্দচয়ন ও বাক্যগঠন স্থানীয় রীতিতে হবে।

লেখা:
${text}
          `,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.85,
            top_p: 0.95,
          },
        }),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setResult(data[0].generated_text);
      } else {
        setResult("রূপান্তর করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      setResult("কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bangla Accent Translator
        </h1>
        <p className="text-gray-500 mb-8">
          Convert Bangla text into regional Bangladeshi accents and dialects.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <label className="font-medium mb-2">
              Original Bangla Text
            </label>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="আজ আমরা সবাই একসাথে বাজারে যাবো..."
              className="w-full h-48 p-4 rounded-xl border bg-transparent resize-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="font-medium mt-4 mb-2">
              Select Regional Accent
            </label>

            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full p-3 rounded-lg border bg-transparent"
            >
              {ACCENTS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>

            <button
              disabled={!text || loading}
              onClick={translateAccent}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Translating…
                </>
              ) : (
                <>
                  <Languages size={18} />
                  Convert Accent
                </>
              )}
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-semibold mb-3">
              Regional Output
            </h3>

            {!result && (
              <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
                Accent-based Bangla will appear here
              </div>
            )}

            {result && (
              <>
                <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
                  {result}
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="mt-4 border rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Download size={14} className="inline mr-2" />
                  Copy Text
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

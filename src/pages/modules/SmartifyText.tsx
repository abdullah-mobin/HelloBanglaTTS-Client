import { useState } from "react";
import Footer from "../../components/Footer";
import { Sparkles, Loader2, Download } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SmartifyText() {
  const { accessToken } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const smartify = async () => {
    setLoading(true);
    setResult("");
    setError("");
    setSuccess("");

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
      const res = await fetch(`${BACKEND_URL}generate/smartify`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to smartify text");
      const data = await res.json();
      setResult(data.data.rewritten || data.rewritten);
      setSuccess("Text smartified successfully!");
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error smartifying text");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bangla Smartify Text
        </h1>
        <p className="text-gray-500 mb-8">
          Improve clarity and professionalism of Bangla text using AI.
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
              placeholder="এই লেখাটি কিছুটা দুর্বল এবং আরও উন্নত করা দরকার..."
              className="w-full h-56 p-4 rounded-xl border bg-transparent resize-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={!text || loading}
              onClick={smartify}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Smartifying…
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Smartify Text
                </>
              )}
            </button>

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

          {/* RIGHT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-semibold mb-3">
              Smartified Output
            </h3>

            {!result && (
              <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
                Smartified text will appear here
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

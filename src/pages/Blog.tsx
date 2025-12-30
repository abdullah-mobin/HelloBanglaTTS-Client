import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type BlogPost = {
  title: string;
  excerpt: string;
  content: string;
};

const demoBlogs: BlogPost[] = [
  {
    title: "Introducing helloBanglaTTS",
    excerpt: "Learn about our mission to bring high-quality Bangla TTS to everyone...",
    content:
      "Full blog content: helloBanglaTTS was created to make high-quality Bangla text-to-speech accessible for developers, creators, and businesses...",
  },
  {
    title: "How to Integrate Our API",
    excerpt: "A step-by-step guide to integrate helloBanglaTTS into your app...",
    content:
      "Full blog content: Integrating helloBanglaTTS API is simple. You just need to send your text and select the voice. Here’s an example with fetch...",
  },
  {
    title: "Choosing the Right Voice",
    excerpt: "Understand the differences between our free and premium actors...",
    content:
      "Full blog content: Our free voices are perfect for testing and personal projects. Premium voices offer higher clarity and multiple tonal options...",
  },
  {
    title: "Understanding Character Limits",
    excerpt: "Make sure you know how much text you can convert per month...",
    content:
      "Full blog content: Free plan allows 5,000 characters/month. Pro plan allows 100,000 characters/month. Enterprise is unlimited...",
  },
  {
    title: "Tips for Better Bangla TTS",
    excerpt: "Best practices to get natural and clear speech output...",
    content:
      "Full blog content: Use proper punctuation, avoid excessive abbreviations, and split long paragraphs into sentences. This ensures natural TTS output...",
  },
];

export default function Blog() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">Blog</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {demoBlogs.map((blog) => (
            <div
              key={blog.title}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
              <button
                onClick={() => setSelected(blog)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-3xl w-full relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-4">{selected.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{selected.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

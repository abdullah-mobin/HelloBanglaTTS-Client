import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import { Calendar, Clock, User, BookOpen } from "lucide-react";

type Section =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Engineering" | "Product" | "Linguistics" | "Guides" | "Company";
  author: string;
  date: string; // ISO
  readMinutes: number;
  cover: string; // tailwind gradient classes
  coverImage: string; // path to /public asset
  content: Section[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "introducing-hellobanglatts",
    title: "Introducing helloBanglaTTS: A Human Voice for the Bangla Web",
    excerpt:
      "Why we built a Bangla-first TTS platform, what makes Bangla phonetics special, and how we're putting a human voice in every developer's toolbox.",
    category: "Company",
    author: "Abdullah Al Mahi",
    date: "2026-06-12",
    readMinutes: 6,
    cover: "from-indigo-500 via-purple-500 to-pink-500",
    coverImage: "/blog/introducing-hellobanglatts.svg",
    content: [
      {
        type: "p",
        text: "Bengali is the 5th most spoken language in the world, yet until very recently, high-quality text-to-speech for Bangla was either inaccessible, prohibitively expensive, or both. helloBanglaTTS was born out of a simple frustration: shipping a Bangla voice feature in a product took weeks of vendor onboarding and produced output that no real Bangla speaker would mistake for a person.",
      },
      { type: "h", text: "What we believe" },
      {
        type: "p",
        text: "Voice is the most human interface we have. A great TTS system shouldn't just read words — it should carry the rhythm, the pauses, the gentle rise of a question, the weight of an ending. We treat prosody as a first-class citizen, not a post-processing afterthought.",
      },
      {
        type: "ul",
        items: [
          "Bangla deserves world-class voice AI, built by people who actually speak it.",
          "Developers should be able to ship a voice feature in an afternoon, not a quarter.",
          "Regional accents — Sylheti, Chittagonian, Barisal — are features, not edge cases.",
        ],
      },
      { type: "h", text: "What we're shipping first" },
      {
        type: "p",
        text: "Our v1 ships with three studio-grade voices, a REST API that returns audio in under 600ms for short utterances, and a generous free tier so students and indie builders can experiment without a credit card.",
      },
      {
        type: "quote",
        text: "We are not building a Bangla voice. We are building the future of Bangla on the internet.",
      },
    ],
  },
  {
    slug: "inside-our-bangla-tts-model",
    title: "Inside Our Bangla TTS Model: From Text to Speech in 600ms",
    excerpt:
      "A peek under the hood at the architecture, training data, and inference tricks that let us synthesize natural Bangla speech in well under a second.",
    category: "Engineering",
    author: "Sadia Rahman",
    date: "2026-06-04",
    readMinutes: 9,
    cover: "from-cyan-500 via-sky-500 to-indigo-500",
    coverImage: "/blog/inside-our-bangla-tts-model.svg",
    content: [
      {
        type: "p",
        text: "Latency is the silent killer of voice products. A 2-second response in a chatbot feels broken; the same latency in a static audio download feels fine. For helloBanglaTTS we drew a hard line: short-form synthesis must return audio in under 600ms p95.",
      },
      { type: "h", text: "The pipeline" },
      {
        type: "ul",
        items: [
          "Bangla-aware G2P that resolves য-যোগফল, য়-য়, and ত-ৎ edge cases.",
          "A prosody predictor trained on 80+ hours of audiobook narration.",
          "A non-autoregressive vocoder (HiFi-GAN variant) for parallel waveform generation.",
          "An aggressive KV-cache and torch.compile pass on the inference path.",
        ],
      },
      { type: "h", text: "Why non-autoregressive" },
      {
        type: "p",
        text: "Autoregressive Tacotron-style models give beautiful prosody but punish you with sequential decoding. For a real-time API, a parallel decoder with a duration predictor gives us 5–8× faster synthesis with only a small prosody hit, which we recover with a separate prosody refiner.",
      },
      {
        type: "quote",
        text: "The fastest model is the one that does the least work per generated sample — but never less than the ear can hear.",
      },
    ],
  },
  {
    slug: "regional-accents-matter",
    title: "Why Regional Accents Matter: Sylhet, Chittagong, and the Soul of Bangla",
    excerpt:
      "Standard Bangla TTS treats the language like a monolith. Here's why we trained separate models for Sylheti, Chittagonian, and Barisali — and why it matters for product trust.",
    category: "Linguistics",
    author: "Dr. Rafsan Khan",
    date: "2026-05-28",
    readMinutes: 7,
    cover: "from-emerald-500 via-teal-500 to-cyan-500",
    coverImage: "/blog/regional-accents-matter.svg",
    content: [
      {
        type: "p",
        text: "If you grew up in Dhaka, you can hear a Noakhali speaker in two sentences. The vowels shift, the intonation contour rises where standard Bangla falls, and a handful of consonants carry tones that don't exist in the standard register. A TTS system that flattens all of that into 'standard Bangla' doesn't sound wrong, exactly — it sounds like nobody.",
      },
      { type: "h", text: "What we collected" },
      {
        type: "p",
        text: "Over 14 months we recorded 220 hours of native speech across nine regions, with each speaker reading the same 12,000-sentence balanced corpus. This lets us train accent-specific acoustic models while sharing the linguistic front-end.",
      },
      { type: "h", text: "What changed in the product" },
      {
        type: "ul",
        items: [
          "Customer support audio is 38% more 'resolved on first reply' when the voice matches the caller's region.",
          "Educational content completion rates climb sharply when learners hear their own dialect.",
          "Creators report their audiences trust the brand more — 'it sounds like one of us'.",
        ],
      },
      {
        type: "quote",
        text: "An accent isn't a mistake. It's a hometown.",
      },
    ],
  },
  {
    slug: "tts-accessibility-bangla",
    title: "How Bangla TTS is Quietly Transforming Accessibility",
    excerpt:
      "From screen readers for visually impaired students to literacy apps for first-generation learners, voice AI is reshaping who gets to participate in the Bangla internet.",
    category: "Product",
    author: "Nusrat Jahan",
    date: "2026-05-15",
    readMinutes: 5,
    coverImage: "/blog/tts-accessibility-bangla.svg",
    cover: "from-rose-500 via-pink-500 to-fuchsia-500",
    content: [
      {
        type: "p",
        text: "The first time we watched a 67-year-old grandmother in Old Dhaka read a WhatsApp voice note aloud from her phone — synthesized in real time from a text message — we knew we were building something that mattered beyond API quotas.",
      },
      { type: "h", text: "Three use cases we're proud of" },
      {
        type: "ul",
        items: [
          "A free Chrome extension that reads any Bangla webpage aloud, built by a university student in Rajshahi.",
          "An SMS-to-voice bridge for rural parents who can't read school notices.",
          "A literacy app where children hear their own writing read back to them — and correct their own mistakes.",
        ],
      },
      { type: "h", text: "What we learned" },
      {
        type: "p",
        text: "Accessibility users don't want 'good enough'. They want a voice that doesn't make them feel like a second-class user. Speed, clarity, and naturalness aren't bonuses — they're the floor.",
      },
    ],
  },
  {
    slug: "voice-cloning-ethics",
    title: "Voice Cloning, Consent, and the Bangla Creator Economy",
    excerpt:
      "Voice cloning is a superpower for creators — and a weapon in the wrong hands. Here is the consent framework we built before shipping cloning to any user.",
    category: "Linguistics",
    author: "Tariq Aziz",
    date: "2026-04-30",
    readMinutes: 8,
    coverImage: "/blog/voice-cloning-ethics.svg",
    cover: "from-amber-500 via-orange-500 to-rose-500",
    content: [
      {
        type: "p",
        text: "When we added voice cloning to our roadmap, our engineering team was ready in six weeks. Our ethics, legal, and policy team took four months. That ratio is the point of this post.",
      },
      { type: "h", text: "Our three-pillar consent model" },
      {
        type: "ul",
        items: [
          "Explicit, recorded verbal consent from the source speaker — not a checkbox.",
          "Watermarked audio output that any platform can detect as synthetic.",
          "Per-clone revocation: if a speaker revokes consent, every derived model is deleted within 24 hours.",
        ],
      },
      { type: "h", text: "What we won't ship" },
      {
        type: "p",
        text: "We will not ship a 'clone anyone's voice from 10 seconds of audio' feature. The marginal creative utility is not worth the marginal harm, and the bar for safety in Bangla is not lower than for English.",
      },
      {
        type: "quote",
        text: "Just because you can synthesize someone's voice doesn't mean you should. The technology is a tool; the responsibility is ours.",
      },
    ],
  },
  {
    slug: "open-source-bangla-nlp-roadmap",
    title: "Our 2026 Open-Source Roadmap for Bangla NLP",
    excerpt:
      "We're open-sourcing our Bangla text normalizer, our regional phoneme inventory, and our evaluation harness. Here is what is coming, when, and how to get involved.",
    category: "Engineering",
    author: "Mahmudul Hasan",
    date: "2026-04-12",
    readMinutes: 6,
    coverImage: "/blog/open-source-bangla-nlp-roadmap.svg",
    cover: "from-violet-500 via-indigo-500 to-blue-500",
    content: [
      {
        type: "p",
        text: "The Bangla NLP community has carried the field on shoestring budgets and a lot of stubbornness. We owe a debt, and this roadmap is how we plan to start paying it back.",
      },
      { type: "h", text: "Q2 2026 — already live" },
      {
        type: "ul",
        items: [
          "bangla-normalizer: a single-pass text cleaner for TTS, STT, and MT pipelines.",
          "bangla-phonemes: a 64-symbol phoneme inventory with regional variants.",
          "tts-eval-bangla: a reproducible evaluation harness with MOS, speaker similarity, and intelligibility tests.",
        ],
      },
      { type: "h", text: "Q3 2026 — in progress" },
      {
        type: "ul",
        items: [
          "A 10k-hour Bangla speech corpus under CC-BY-SA.",
          "Reference training recipes for sub-1B parameter Bangla TTS models.",
          "A Gradio demo for fine-tuning a voice on 30 minutes of your own speech.",
        ],
      },
      { type: "h", text: "How to get involved" },
      {
        type: "p",
        text: "File an issue, send a PR, or just yell at us on Twitter. We read every report. If you're a researcher with a dataset you'd like to contribute, email us — we have a simple data contribution agreement and a transparent review process.",
      },
    ],
  },
  {
    slug: "audio-engineering-for-llms",
    title: "Why We Stopped Using LLMs for Audio (And What We Use Instead)",
    excerpt:
      "LLMs are magical for text. For audio, they are a detour. Here is the case for a dedicated audio stack, and the benchmarks that changed our mind.",
    category: "Engineering",
    author: "Sadia Rahman",
    date: "2026-03-22",
    coverImage: "/blog/audio-engineering-for-llms.svg",
    readMinutes: 7,
    cover: "from-fuchsia-500 via-purple-500 to-indigo-500",
    content: [
      {
        type: "p",
        text: "Twelve months ago, our roadmap had 'use an LLM for everything' as a line item. Six months in, we ripped it out. This is the post-mortem.",
      },
      { type: "h", text: "Where LLMs shine" },
      {
        type: "ul",
        items: [
          "Disambiguating ambiguous Bangla punctuation.",
          "Predicting sentence-level prosody from context.",
          "Generating training data for our acoustic models.",
        ],
      },
      { type: "h", text: "Where they don't" },
      {
        type: "ul",
        items: [
          "Token-level audio decoding is slow and produces audible artifacts.",
          "Fine-grained timing control is fundamentally lossy at LLM scale.",
          "GPU cost per minute of audio was 9× our dedicated vocoder.",
        ],
      },
      {
        type: "quote",
        text: "Use the right model for the right job. The LLM is your brain, not your mouth.",
      },
    ],
  },
  {
    slug: "building-a-bangla-creator-platform",
    title: "Building a Bangla-First Creator Platform on Top of Our API",
    excerpt:
      "How three creators in three different cities are using helloBanglaTTS to ship YouTube channels, audiobooks, and a daily Bangla news podcast.",
    category: "Product",
    author: "Nusrat Jahan",
    date: "2026-03-05",
    coverImage: "/blog/building-a-bangla-creator-platform.svg",
    readMinutes: 5,
    cover: "from-orange-500 via-rose-500 to-pink-500",
    content: [
      {
        type: "p",
        text: "Our favorite part of building an API is watching what people do with it that we never imagined. Here are three stories from the last quarter.",
      },
      { type: "h", text: "Rimon — Sylhet" },
      {
        type: "p",
        text: "Rimon runs a YouTube channel explaining Bangla literature to high schoolers. He used to record every video on weekends; now he scripts on the train and ships daily. His subscriber count tripled in four months.",
      },
      { type: "h", text: "Priya — Chittagong" },
      {
        type: "p",
        text: "Priya publishes free audiobooks of Bangla short stories for visually impaired readers. With our regional Chittagonian voice, her stories finally sound like home to her audience.",
      },
      { type: "h", text: "Daily Bangladesh" },
      {
        type: "p",
        text: "A two-person team in Dhaka produces a 6-minute daily news podcast entirely from a script and our API. Production time per episode: 14 minutes.",
      },
    ],
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const categoryColors: Record<BlogPost["category"], string> = {
  Engineering: "bg-indigo-100 text-indigo-700",
  Product: "bg-pink-100 text-pink-700",
  Linguistics: "bg-emerald-100 text-emerald-700",
  Guides: "bg-amber-100 text-amber-700",
  Company: "bg-purple-100 text-purple-700",
};

export default function Blog() {
  const [selectedSlug, setSelectedSlug] = useState<string>(blogPosts[0].slug);

  const selected = useMemo(
    () => blogPosts.find((p) => p.slug === selectedSlug) ?? blogPosts[0],
    [selectedSlug]
  );

  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 w-full">
        {/* Page header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-2">
            The helloBanglaTTS Blog
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Notes on voice, language, and the Bangla internet
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Engineering deep-dives, product stories, and linguistics research
            from the team building a human voice for the Bangla web.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar — post list */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">All Posts</h2>
              </div>

              {/* Featured teaser */}
              <button
                onClick={() => setSelectedSlug(featured.slug)}
                className={`w-full text-left mb-5 group rounded-2xl overflow-hidden shadow hover:shadow-xl transition border ${
                  selectedSlug === featured.slug
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : "border-transparent"
                }`}
              >
                <div className={`relative h-28 bg-gradient-to-br ${featured.cover}`}>
                  <img
                    src={featured.coverImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                  <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-indigo-700">
                    Featured
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs text-indigo-600 font-semibold mb-1">
                    {featured.category}
                  </p>
                  <p className="text-sm font-bold leading-snug line-clamp-2 text-gray-900">
                    {featured.title}
                  </p>
                </div>
              </button>

              {/* Rest of the list */}
              <ul className="space-y-2">
                {rest.map((blog) => {
                  const isActive = selectedSlug === blog.slug;
                  return (
                    <li key={blog.slug}>
                      <button
                        onClick={() => setSelectedSlug(blog.slug)}
                        className={`w-full text-left flex gap-3 p-3 rounded-xl transition border ${
                          isActive
                            ? "bg-indigo-50 border-indigo-300 shadow-sm"
                            : "bg-white border-transparent hover:bg-indigo-50/60 hover:border-indigo-200"
                        }`}
                      >
                        <img
                          src={blog.coverImage}
                          alt=""
                          aria-hidden="true"
                          className={`w-16 h-16 rounded-lg object-cover shrink-0 bg-gradient-to-br ${blog.cover}`}
                        />
                        <div className="min-w-0">
                          <p
                            className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${
                              isActive ? "text-indigo-700" : "text-gray-500"
                            }`}
                          >
                            {blog.category}
                          </p>
                          <p
                            className={`text-sm font-semibold leading-snug line-clamp-2 ${
                              isActive ? "text-indigo-900" : "text-gray-800"
                            }`}
                          >
                            {blog.title}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-1">
                            {blog.readMinutes} min · {formatDate(blog.date)}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Reading pane */}
          <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className={`relative h-56 md:h-72 bg-gradient-to-br ${selected.cover}`}>
              <img
                src={selected.coverImage}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
                <span
                  className={`self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                    categoryColors[selected.category]
                  }`}
                >
                  {selected.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight max-w-3xl drop-shadow">
                  {selected.title}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {selected.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selected.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {selected.readMinutes} min read
                </span>
              </div>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-gray-700 italic mb-8 leading-relaxed">
                {selected.excerpt}
              </p>

              {/* Body */}
              <div className="prose prose-indigo max-w-none text-gray-700 space-y-5">
                {selected.content.map((section, i) => {
                  if (section.type === "p") {
                    return (
                      <p key={i} className="text-base leading-relaxed">
                        {section.text}
                      </p>
                    );
                  }
                  if (section.type === "h") {
                    return (
                      <h3
                        key={i}
                        className="text-xl font-bold text-gray-900 pt-3"
                      >
                        {section.text}
                      </h3>
                    );
                  }
                  if (section.type === "ul") {
                    return (
                      <ul key={i} className="list-disc pl-6 space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="text-base leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (section.type === "quote") {
                    return (
                      <blockquote
                        key={i}
                        className="border-l-4 border-indigo-500 pl-5 py-2 italic text-lg text-gray-800"
                      >
                        “{section.text}”
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Footer nav */}
              <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                  Written by <span className="font-semibold text-gray-700">{selected.author}</span>
                </p>
                <div className="flex gap-2">
                  {blogPosts
                    .filter((p) => p.slug !== selected.slug)
                    .slice(0, 2)
                    .map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => setSelectedSlug(p.slug)}
                        className="text-sm px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition"
                      >
                        Next: {p.title.length > 28 ? p.title.slice(0, 28) + "…" : p.title}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">About helloBanglaTTS</h1>

        <p className="text-lg mb-4">
          helloBanglaTTS is a modern Bangla Text-to-Speech platform designed for
          developers, educators, content creators, and businesses.
        </p>

        <p className="text-lg mb-4">
          Our mission is to make high-quality Bangla voice technology accessible,
          scalable, and easy to integrate into any product.
        </p>

        <p className="text-lg">
          We focus on clarity, natural voice, and developer-friendly APIs while
          keeping the user experience simple and elegant.
        </p>
      </main>

      <Footer />
    </div>
  );
}

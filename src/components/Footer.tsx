import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Brand size="sm" />
            <p className="text-sm text-gray-600 mt-4 max-w-xs">
              The complete Bangla AI toolkit. Natural voices, regional accents,
              stories, images, and videos — built for developers and creators.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/modules/tts" className="hover:text-indigo-600">Text to Speech</Link></li>
              <li><Link to="/modules/video" className="hover:text-indigo-600">Text to Video</Link></li>
              <li><Link to="/modules/image" className="hover:text-indigo-600">Text to Image</Link></li>
              <li><Link to="/modules/story" className="hover:text-indigo-600">Story Generator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
              <li><Link to="/career" className="hover:text-indigo-600">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-600">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-600">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/support" className="hover:text-indigo-600">Help Center</Link></li>
              <li><a href="#" className="hover:text-indigo-600">API Docs</a></li>
              <li><a href="#" className="hover:text-indigo-600">Status</a></li>
              <li><a href="mailto:support@hellobanglatts.com" className="hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} HelloBanglaTTS</span>
            <span className="hidden md:inline">·</span>
            <span>Made with care in Bangladesh</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

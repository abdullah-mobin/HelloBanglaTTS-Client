import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Career";
import Blog from "./pages/Blog";

import LeftPanel from "./components/LeftPanel";

import VideoGen from "./pages/modules/VideoGen";
import ImageGen from "./pages/modules/ImageGen";
import StoryGen from "./pages/modules/StoryGen";
import AccentTranslate from "./pages/modules/AccentTranslate";
import SmartifyText from "./pages/modules/SmartifyText";
import Humanizer from "./pages/modules/Humanizer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <LeftPanel />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />

            <Route path="/modules/video" element={<VideoGen />} />
            <Route path="/modules/image" element={<ImageGen />} />
            <Route path="/modules/story" element={<StoryGen />} />
            <Route path="/modules/accent" element={<AccentTranslate />} />
            <Route path="/modules/smartify" element={<SmartifyText />} />
            <Route path="/modules/humanize" element={<Humanizer />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Career";
import Blog from "./pages/Blog";
import Support from "./pages/Support";

import LeftPanel, {
  LEFT_PANEL_WIDTH_COLLAPSED,
  LEFT_PANEL_WIDTH_EXPANDED,
} from "./components/LeftPanel";
import Navbar from "./components/Navbar";

import TextToSpeech from "./pages/modules/TextToSpeech";
import VideoGen from "./pages/modules/VideoGen";
import ImageGen from "./pages/modules/ImageGen";
import StoryGen from "./pages/modules/StoryGen";
import AccentTranslate from "./pages/modules/AccentTranslate";
import SmartifyText from "./pages/modules/SmartifyText";
import Humanizer from "./pages/modules/Humanizer";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

const SIDEBAR_COLLAPSED_KEY = "leftPanelCollapsed";

function AppContent() {
  const location = useLocation();
  const isModulePage = location.pathname.startsWith("/modules");
  const { isLoggedIn } = useAuth();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    } catch {
      /* ignore quota / private mode */
    }
  }, [collapsed]);

  const sidebarWidth = isLoggedIn
    ? collapsed
      ? LEFT_PANEL_WIDTH_COLLAPSED
      : LEFT_PANEL_WIDTH_EXPANDED
    : 0;

  return (
    <div className="flex">
      {isLoggedIn && (
        <LeftPanel
          isLoggedIn={isLoggedIn}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
      )}

      <div
        className="flex-1 flex flex-col ml-0 transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: `${sidebarWidth}rem` }}
      >
        <Navbar isModulePage={isModulePage} sidebarWidth={sidebarWidth} />

        <div className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />

            <Route path="/modules/tts" element={<TextToSpeech />} />
            <Route path="/modules/video" element={isLoggedIn ? <VideoGen /> : <Navigate to="/" />} />
            <Route path="/modules/image" element={isLoggedIn ? <ImageGen /> : <Navigate to="/" />} />
            <Route path="/modules/story" element={isLoggedIn ? <StoryGen /> : <Navigate to="/" />} />
            <Route path="/modules/accent" element={isLoggedIn ? <AccentTranslate /> : <Navigate to="/" />} />
            <Route path="/modules/smartify" element={isLoggedIn ? <SmartifyText /> : <Navigate to="/" />} />
            <Route path="/modules/humanize" element={isLoggedIn ? <Humanizer /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

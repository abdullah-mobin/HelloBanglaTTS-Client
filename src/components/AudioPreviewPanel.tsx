import { Play, Pause, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  audioUrl?: string | null;
};

const DEMO_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
// replace later with your own Bangla demo

export default function AudioPreviewPanel({ audioUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const src = audioUrl || DEMO_AUDIO;

  useEffect(() => {
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="mt-6 h-40 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white"
        >
          {playing ? <Pause /> : <Play />}
        </button>

        <div>
          <h3 className="font-semibold text-lg">Audio Preview</h3>
          <p className="text-sm text-gray-500">
            {audioUrl ? "Generated voice output" : "Demo welcome voice"}
          </p>
        </div>
      </div>

      <Volume2 className="text-gray-400" size={28} />

      <audio ref={audioRef} src={src} />
    </div>
  );
}

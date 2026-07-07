import { Play, Pause, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  audioUrl?: string | null;
};

export default function AudioPreviewPanel({ audioUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio
  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bassRef = useRef<BiquadFilterNode | null>(null);
  const trebleRef = useRef<BiquadFilterNode | null>(null);

  const [playing, setPlaying] = useState(false);

  // Controls
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0); // cents
  const [bass, setBass] = useState(0);
  const [treble, setTreble] = useState(0);

  // Timeline
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const enabled = Boolean(audioUrl);

  /* ---------- INIT AUDIO GRAPH ---------- */
  // Re-runs when `enabled` flips on so the audio element is guaranteed mounted.
  useEffect(() => {
    if (!enabled || !audioRef.current || ctxRef.current) return;

    const audioEl = audioRef.current;
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioEl);

    const bassFilter = ctx.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 200;

    const trebleFilter = ctx.createBiquadFilter();
    trebleFilter.type = "highshelf";
    trebleFilter.frequency.value = 3000;

    const gain = ctx.createGain();

    source
      .connect(bassFilter)
      .connect(trebleFilter)
      .connect(gain)
      .connect(ctx.destination);

    ctxRef.current = ctx;
    sourceRef.current = source;
    bassRef.current = bassFilter;
    trebleRef.current = trebleFilter;
    gainRef.current = gain;

    return () => {
      try {
        source.disconnect();
        bassFilter.disconnect();
        trebleFilter.disconnect();
        gain.disconnect();
      } catch {
        /* nodes already detached */
      }
      ctx.close().catch(() => {});
      ctxRef.current = null;
      sourceRef.current = null;
      bassRef.current = null;
      trebleRef.current = null;
      gainRef.current = null;
    };
  }, [enabled]);

  /* ---------- RESET ON NEW AUDIO ---------- */
  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setPlaying(false);
  }, [audioUrl]);

  /* ---------- APPLY EFFECTS ---------- */
  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    if (bassRef.current) bassRef.current.gain.value = bass;
  }, [bass]);

  useEffect(() => {
    if (trebleRef.current) trebleRef.current.gain.value = treble;
  }, [treble]);

  // Combine speed and pitch into playbackRate so the pitch slider is audible.
  // Cents → ratio: 2^(cents/1200). preservesPitch=false means pitch shifts
  // alongside rate (vinyl-style); for true independent pitch shifting a
  // library like soundtouchjs is required.
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed * Math.pow(2, pitch / 1200);
    audioRef.current.preservesPitch = false;
  }, [speed, pitch]);

  /* ---------- TIMELINE ---------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    const meta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", meta);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", meta);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !enabled) return;

    if (ctxRef.current?.state === "suspended") {
      await ctxRef.current.resume();
    }

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
      setPlaying(false);
    }
  };

  const seek = (v: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = v;
    setCurrentTime(v);
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div
      className={`mt-6 rounded-2xl border shadow-sm p-6 transition ${
        enabled
          ? "bg-white dark:bg-gray-900"
          : "bg-gray-100 dark:bg-gray-800 opacity-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          disabled={!enabled}
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-indigo-600 disabled:opacity-40 flex items-center justify-center text-white"
        >
          {playing ? <Pause /> : <Play />}
        </button>

        <div>
          <h3 className="font-semibold text-lg">Audio Preview</h3>
          <p className="text-sm text-gray-500">
            {enabled
              ? "Preview & fine-tune generated audio"
              : "Generate audio to enable preview"}
          </p>
        </div>

        <Volume2 className="ml-auto text-gray-400" />
      </div>

      {/* Timeline */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={currentTime}
          disabled={!enabled}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Animated bars */}
      <div className="flex items-end gap-1 h-12 mt-4">
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-indigo-500"
            style={{
              height: enabled && playing
                ? `${10 + Math.random() * 40}px`
                : "8px",
              opacity: enabled ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
        <Control label="Volume">
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={volume}
            disabled={!enabled}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </Control>

        <Control label="Pitch">
          <input
            type="range"
            min="0.7"
            max="1.5"
            step="0.1"
            value={speed}
            disabled={!enabled}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </Control>

        {/* <Control label="Pitch (cents)">
          <input
            type="range"
            min="-600"
            max="600"
            step="10"
            value={pitch}
            disabled={!enabled}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </Control> */}

        <Control label="Bass">
          <input
            type="range"
            min="-15"
            max="15"
            step="1"
            value={bass}
            disabled={!enabled}
            onChange={(e) => setBass(Number(e.target.value))}
          />
        </Control>

        <Control label="Treble">
          <input
            type="range"
            min="-15"
            max="15"
            step="1"
            value={treble}
            disabled={!enabled}
            onChange={(e) => setTreble(Number(e.target.value))}
          />
        </Control>
      </div>

      {/* Always-mounted so the ref is available when the Web Audio graph initializes. */}
      <audio ref={audioRef} src={audioUrl ?? undefined} className="hidden" />
    </div>
  );
}

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {children}
    </div>
  );
}

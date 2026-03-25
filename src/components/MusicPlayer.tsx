import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "NEURAL_LINK",
    artist: "SYNTH_01",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "VOID_WALKER",
    artist: "PULSE_02",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "STATIC_RAIN",
    artist: "WAVE_03",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#bc13fe"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', nextTrack);
    };
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-black border-4 border-glitch-magenta shadow-[8px_8px_0px_#00ffff] relative overflow-hidden font-pixel">
      <div className="flex items-center gap-6">
        {/* Album Art Placeholder */}
        <motion.div 
          key={currentTrack.id}
          className="w-20 h-20 bg-black border-2 border-glitch-cyan flex items-center justify-center relative overflow-hidden"
        >
          <Music className="w-8 h-8 text-glitch-cyan/30" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />
        </motion.div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-[10px] glitch-text text-glitch-cyan mb-2" data-text={currentTrack.title}>{currentTrack.title}</h3>
              <p className="text-[8px] text-glitch-magenta/60 uppercase tracking-tighter">{currentTrack.artist}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-4">
            <button onClick={prevTrack} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
              <SkipBack size={16} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 bg-glitch-cyan text-black flex items-center justify-center hover:bg-glitch-magenta transition-colors"
            >
              {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}
            </button>
            <button onClick={nextTrack} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-2 w-full bg-glitch-cyan/10 border border-glitch-cyan/30 overflow-hidden">
        <motion.div 
          className="h-full bg-glitch-magenta"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between items-center text-[6px] uppercase tracking-tighter text-glitch-cyan/40">
        <div className="flex items-center gap-2">
          <Volume2 size={10} />
          <span>SIGNAL_STRENGTH: 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-glitch-magenta animate-ping" />
          <span>STREAM_ACTIVE</span>
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack.url} />
    </div>
  );
}

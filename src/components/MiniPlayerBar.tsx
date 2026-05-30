import { useState, MouseEvent } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Share2, RotateCcw } from 'lucide-react';
import { useAudioPlayer } from './AudioPlayer';
import { formatDuration } from '../data/radioData';

export default function MiniPlayerBar() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    autoPlay,
    togglePlay,
    seek,
    setVolume,
    toggleAutoPlay,
    nextEpisode,
    previousEpisode,
  } = useAudioPlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showRipple, setShowRipple] = useState(false);
  const [rippleCoords, setRippleCoords] = useState({ x: 0, y: 0 });

  if (!currentEpisode) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const handlePlayClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    togglePlay();
  };

  return (
    <div className="glass-player fixed bottom-0 left-0 right-0 z-[1000]">
      {/* Progress bar */}
      <div className="h-1 w-full bg-ink-100">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3B82F6, #0057B8)',
            boxShadow: '0 0 8px rgba(59,130,246,0.6)'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Thumbnail + Title */}
          <div className="flex items-center gap-3 flex-shrink-0 w-64 lg:w-80">
            <img
              src={currentEpisode.thumbnail}
              alt={currentEpisode.title}
              className="w-12 h-12 rounded-lg object-cover shadow-md"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-ink-900 truncate">
                {currentEpisode.title}
              </h4>
              <p className="text-xs text-ink-500 truncate">
                {currentEpisode.subtitle}
              </p>
            </div>
          </div>

          {/* Center: Transport Controls */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <button
              onClick={previousEpisode}
              className="p-2 text-ink-500 hover:text-primary transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => seek(currentTime - 15)}
              className="p-1.5 text-ink-500 hover:text-primary transition-colors relative group"
            >
              <SkipBack className="w-4 h-4" />
              <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 text-[8px] font-bold">15</span>
            </button>

            <button
              onClick={handlePlayClick}
              className="relative overflow-hidden w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary text-white flex items-center justify-center hover:shadow-xl transition-all shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(59,130,246,0.4)' }}
            >
              {showRipple && (
                <span
                  className="ripple-span"
                  style={{ left: rippleCoords.x, top: rippleCoords.y }}
                />
              )}
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={() => seek(currentTime + 15)}
              className="p-1.5 text-ink-500 hover:text-primary transition-colors relative group"
            >
              <SkipForward className="w-4 h-4" />
              <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 text-[8px] font-bold">15</span>
            </button>

            <button
              onClick={nextEpisode}
              className="p-2 text-ink-500 hover:text-primary transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar with time */}
          <div className="hidden md:flex items-center gap-3 flex-grow">
            <span className="text-xs font-bold text-primary min-w-[50px] text-right">
              {formatDuration(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow h-1.5 rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 ${(currentTime / duration) * 100}%, #E2E8F0 ${(currentTime / duration) * 100}%)`
              }}
            />

            <span className="text-xs font-bold text-ink-500 min-w-[50px]">
              {formatDuration(duration || currentEpisode.duration)}
            </span>
          </div>

          {/* Right: Volume + Speed + Share */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Volume */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="p-2 text-ink-500 hover:text-primary transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-20 bg-white border border-ink-100 rounded-lg shadow-xl p-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="1"
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Speed */}
            <button
              onClick={cycleSpeed}
              className="px-2 py-1 bg-ink-100 rounded-lg text-xs font-bold text-ink-700 hover:bg-primary-100 transition-colors"
            >
              {speed}x
            </button>

            {/* Auto Play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                autoPlay
                  ? 'bg-primary text-white'
                  : 'bg-ink-100 text-ink-500'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tự động</span>
            </button>

            {/* Share */}
            <button className="p-2 text-ink-500 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

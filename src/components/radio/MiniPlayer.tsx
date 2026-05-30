import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { formatDuration } from '../../data/radioEpisodes';
import { useState, useEffect } from 'react';

export default function MiniPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    nextEpisode,
    previousEpisode,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  const [showVolume, setShowVolume] = useState(false);

  // Debug: Log state to verify persistence
  useEffect(() => {
    console.log('MiniPlayer - currentEpisode:', currentEpisode?.title);
    console.log('MiniPlayer - isPlaying:', isPlaying);
  }, [currentEpisode, isPlaying]);

  if (!currentEpisode) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    seek(seekTime);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[90]"
        style={{ height: '72px' }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl h-full">
          {/* Progress bar */}
          <div className="relative h-1 bg-gray-200">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="flex items-center gap-4">
              {/* Thumbnail and title */}
              <div className="flex items-center gap-3 flex-shrink-0 w-1/4 min-w-0">
                <motion.img
                  key={currentEpisode.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={currentEpisode.thumbnail}
                  alt={currentEpisode.title}
                  className="w-14 h-14 rounded-lg object-cover shadow-md"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {currentEpisode.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {currentEpisode.host.name}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={previousEpisode}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  )}
                </motion.button>

                <button
                  onClick={nextEpisode}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Time display */}
              <div className="hidden sm:flex items-center gap-3 flex-grow">
                <span className="text-xs font-mono text-gray-600 min-w-[40px]">
                  {formatDuration(currentTime)}
                </span>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="flex-grow h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3.5
                    [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-blue-600
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 ${progress}%, #E5E7EB ${progress}%)`
                  }}
                />

                <span className="text-xs font-mono text-gray-600 min-w-[40px]">
                  {formatDuration(duration || currentEpisode.duration)}
                </span>
              </div>

              {/* Volume and auto */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="relative flex items-center"
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <button
                    onClick={toggleMute}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <AnimatePresence>
                    {showVolume && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-xl p-3 border border-gray-200"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-24 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:h-3
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-blue-600
                            [&::-webkit-slider-thumb]:cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #3B82F6 ${(isMuted ? 0 : volume) * 100}%, #E5E7EB ${(isMuted ? 0 : volume) * 100}%)`
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

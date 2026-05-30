import { motion } from 'framer-motion';
import { Play, Pause, Headphones, Clock, Users } from 'lucide-react';
import { RadioEpisode } from '../../data/radioEpisodes';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { formatDuration, formatListenerCount, getRelativeTime } from '../../data/radioEpisodes';

interface RadioHeroProps {
  episode: RadioEpisode;
  listenCount?: number;
  onPlay?: (episode: RadioEpisode) => void;
}

export default function RadioHero({ episode, listenCount = 0, onPlay }: RadioHeroProps) {
  const { currentEpisode, isPlaying } = useAudioPlayer();
  const isActive = currentEpisode?.id === episode.id;

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(episode);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${episode.categoryColor}10 0%, ${episode.categoryColor}05 100%)`
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-pink-100/30 to-orange-100/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Thumbnail */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-lg mx-auto" style={{ aspectRatio: '16/10' }}>
              <motion.img
                key={episode.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-full object-cover rounded-[20px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              />

              {/* Live badge with pulse animation */}
              {episode.isLive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs text-white"
                  style={{
                    background: 'linear-gradient(135deg, #FF2D55, #FF6B6B)',
                    boxShadow: '0 0 0 0 rgba(255,45,85,0.4)',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                  <style>{`
                    @keyframes pulse {
                      0%, 100% { box-shadow: 0 0 0 0 rgba(255,45,85,0.4) }
                      50% { box-shadow: 0 0 0 8px rgba(255,45,85,0) }
                    }
                  `}</style>
                </motion.div>
              )}

              {/* Play button overlay */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayClick}
                className={`absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isActive && isPlaying
                    ? 'bg-white shadow-2xl'
                    : 'bg-white/90 backdrop-blur-sm shadow-xl'
                }`}
              >
                {isActive && isPlaying ? (
                  <Pause className="w-8 h-8 text-gray-900" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                )}
              </motion.button>

              {/* Equalizer animation when playing */}
              {isActive && isPlaying && (
                <div className="absolute bottom-8 right-8 flex items-end gap-0.5 h-10 bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: '2px',
                        background: 'white'
                      }}
                      animate={{
                        height: [4, 16, 8, 14, 4],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Category badge - Navy for Thời Sự */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4"
              style={{
                backgroundColor: episode.category === 'Thời Sự' ? '#1E3A5F' : episode.categoryColor
              }}
            >
              {episode.category}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-headline font-bold text-3xl lg:text-4xl text-gray-900 mb-6 leading-tight"
            >
              {episode.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              {episode.description}
            </motion.p>

            {/* Host */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                {episode.host.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{episode.host.name}</p>
                <p className="text-sm text-gray-500">Host</p>
              </div>
            </motion.div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-1.5 text-[#64748B]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatDuration(episode.duration)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#64748B]">
                <Users className="w-4 h-4" />
                <span className="text-sm">{formatListenerCount(listenCount)} lượt nghe</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#64748B]">
                <Headphones className="w-4 h-4" />
                <span className="text-sm">{getRelativeTime(episode.publishDate, episode.publishTime)}</span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 6px 20px rgba(0,87,184,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayClick}
                className="px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #0057B8)',
                  boxShadow: '0 4px 15px rgba(0,87,184,0.4)'
                }}
              >
                {isActive && isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" fill="currentColor" />
                    Đang phát
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" fill="currentColor" />
                    Phát ngay
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#0057B8', color: '#0057B8' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full border-[1.5px] border-[#CBD5E1] text-[#475569] font-semibold transition-colors"
              >
                Xem chi tiết
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

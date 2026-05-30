import { motion } from 'framer-motion';
import { Play, Pause, Clock, Users } from 'lucide-react';
import { RadioEpisode } from '../../data/radioEpisodes';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { formatDuration, formatListenerCount } from '../../data/radioEpisodes';

interface RadioCardProps {
  episode: RadioEpisode;
  index: number;
  listenCount?: number;
}

export default function RadioCard({ episode, index, listenCount = 0 }: RadioCardProps) {
  const { currentEpisode, isPlaying } = useAudioPlayer();
  const isActive = currentEpisode?.id === episode.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className={`group cursor-pointer relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/20'
          : 'hover:shadow-2xl'
      }`}
    >
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`} />

          {/* Play button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #0B5ED7 100%)' }}
          >
            {isActive && isPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            )}
          </motion.button>

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: episode.categoryColor }}
            >
              {episode.category}
            </span>
          </div>

          {/* Live badge */}
          {episode.isLive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white px-2.5 py-1 rounded-full font-bold text-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
          )}

          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            {formatDuration(episode.duration)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Host */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {episode.host.avatar}
            </div>
            <span className="text-xs text-gray-500">{episode.host.name}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug text-sm">
            {episode.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(episode.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{formatListenerCount(listenCount)} lượt nghe</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { RadioEpisode } from '../../data/radioEpisodes';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useRef } from 'react';
import { formatListenerCount } from '../../data/radioEpisodes';

interface SuggestedCarouselProps {
  title: string;
  episodes: RadioEpisode[];
  listenCounts?: Record<string, number>;
  onPlayEpisode?: (episode: RadioEpisode) => void;
}

export default function SuggestedCarousel({ title, episodes, listenCounts = {}, onPlayEpisode }: SuggestedCarouselProps) {
  const { currentEpisode } = useAudioPlayer();
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 320;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              →
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {episodes.map((episode, idx) => {
            const isActive = currentEpisode?.id === episode.id;

            return (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-[300px] cursor-pointer group"
                onClick={() => onPlayEpisode?.(episode)}
              >
                <div className="relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
                  {/* Image with gradient overlay */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Play button */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #0B5ED7 100%)' }}
                    >
                      {isActive ? (
                        <Pause className="w-5 h-5 text-white" fill="currentColor" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                      )}
                    </motion.button>

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: episode.categoryColor }}
                      >
                        {episode.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 text-sm">
                      {episode.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {episode.host.avatar}
                        </div>
                        <span>{episode.host.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span>{formatListenerCount(listenCounts[episode.id] || 0)} lượt nghe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

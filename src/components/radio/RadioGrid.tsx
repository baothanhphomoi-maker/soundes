import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RadioEpisode } from '../../data/radioEpisodes';
import RadioCard from './RadioCard';

interface RadioGridProps {
  title: string;
  episodes: RadioEpisode[];
  listenCounts?: Record<string, number>;
  onPlayEpisode?: (episode: RadioEpisode) => void;
}

export default function RadioGrid({ title, episodes, listenCounts = {}, onPlayEpisode }: RadioGridProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-1 h-8 rounded"
            style={{
              background: 'linear-gradient(180deg, #3B82F6 0%, #0B5ED7 100%)'
            }}
          />
          <h2 className="text-2xl font-headline font-bold text-gray-900">{title}</h2>
          <div className="flex-grow h-px bg-gray-100 mx-4" />
          <Link to="/radio">
            <motion.span
              whileHover={{ x: 5 }}
              className="text-blue-600 text-sm font-semibold hover:underline cursor-pointer"
            >
              Xem thêm →
            </motion.span>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {episodes.map((episode, idx) => (
            <div
              key={episode.id}
              onClick={() => onPlayEpisode?.(episode)}
            >
              <RadioCard
                episode={episode}
                index={idx}
                listenCount={listenCounts[episode.id] || 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

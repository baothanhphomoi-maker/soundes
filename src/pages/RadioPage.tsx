import { useState, useEffect, useCallback } from 'react';
import { radioEpisodes } from '../data/radioEpisodes';
import { fetchRadioListenCounts } from '../services/api';
import RadioHero from '../components/radio/RadioHero';
import RadioGrid from '../components/radio/RadioGrid';
import SuggestedCarousel from '../components/radio/SuggestedCarousel';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

export default function RadioPage() {
  const { playEpisode, reloadListenCounts } = useAudioPlayer();
  const [listenCounts, setListenCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const loadListenCounts = useCallback(async () => {
    const counts = await fetchRadioListenCounts();
    setListenCounts(counts);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadListenCounts();

    // Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(loadListenCounts, 3000);
    return () => clearInterval(interval);
  }, [loadListenCounts]);

  // Reload when context triggers
  useEffect(() => {
    loadListenCounts();
  }, [loadListenCounts, reloadListenCounts]);

  const handlePlayEpisode = useCallback((episode: any) => {
    playEpisode(episode);
  }, [playEpisode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const heroListenCount = listenCounts[radioEpisodes[0].id] || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <RadioHero episode={radioEpisodes[0]} listenCount={heroListenCount} onPlay={handlePlayEpisode} />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <RadioGrid title="Mới nhất" episodes={radioEpisodes.slice(0, 4)} listenCounts={listenCounts} onPlayEpisode={handlePlayEpisode} />
          <SuggestedCarousel title="Gợi ý cho bạn" episodes={radioEpisodes.slice(4, 8)} listenCounts={listenCounts} onPlayEpisode={handlePlayEpisode} />
          <RadioGrid title="Tất cả tập" episodes={radioEpisodes} listenCounts={listenCounts} onPlayEpisode={handlePlayEpisode} />
        </div>
      </section>
      <div className="h-20" />
    </div>
  );
}

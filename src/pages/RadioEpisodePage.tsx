import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ThumbsUp, ThumbsDown, Share2, Headphones } from 'lucide-react';
import { getEpisodeById, radioSections, formatDuration, formatPlayCount } from '../data/radioData';
import { useAudioPlayer } from '../components/AudioPlayer';

export default function RadioEpisodePage() {
  const { episodeId } = useParams<{ episodeId: string }>();
  const episode = episodeId ? getEpisodeById(episodeId) : null;
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    playEpisode,
  } = useAudioPlayer();

  const currentSections = radioSections.slice(1, 3);

  useEffect(() => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
  }, []);

  useEffect(() => {
    if (episode && (!currentEpisode || currentEpisode.id !== episode.id)) {
      // Auto-play when landing on episode page
      // playEpisode(episode);
    }
  }, [episode, currentEpisode, playEpisode]);

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-mid">Không tìm thấy episode</p>
      </div>
    );
  }

  const isCurrentEpisode = currentEpisode?.id === episode.id;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-accent-gold">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-accent-gold">½</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-neutral-light animate-fade-in pb-32">
      {/* Episode Detail */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Thumbnail */}
          <div className="relative w-full md:w-[340px] flex-shrink-0">
            <div className="relative aspect-[17/10] rounded-xl overflow-hidden">
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-full object-cover"
              />

              {/* Dark blue overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 via-primary/60 to-transparent" />

              {/* Category text */}
              <div className="absolute top-4 left-4 text-white font-headline font-bold text-xl uppercase tracking-wider">
                THỜI SỰ
              </div>

              {/* Play button */}
              <button
                onClick={() => playEpisode(episode)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-accent-red flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  {isCurrentEpisode && isPlaying ? (
                    <Pause className="w-10 h-10 text-white" fill="white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  )}
                </div>
              </button>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-accent-red text-white text-sm font-bold px-3 py-1 rounded-full">
                {Math.floor(episode.duration / 60)}P
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow">
            <h1 className="text-3xl font-headline font-bold text-neutral-dark leading-tight mb-4">
              {episode.title}
            </h1>

            {/* Author row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {episode.authorAvatar}
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center text-white text-xs font-bold">
                  TL
                </div>
              </div>
              <span className="text-sm text-neutral-mid">{episode.author}</span>
              <span className="text-sm text-accent-gold">{renderStars(episode.rating)}</span>
              <span className="text-sm text-neutral-mid">({episode.reviewCount} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <span className="text-sm text-neutral-mid">{episode.publishDate}</span>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </button>
            <button className="flex items-center gap-1.5 text-sm text-neutral-mid hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              {formatPlayCount(episode.playCount)}
            </button>
            <button className="text-sm text-neutral-mid hover:text-primary transition-colors">
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inline Player Widget */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-lg">
              {isCurrentEpisode ? formatDuration(currentTime) : '00:00'}
            </span>
            <div className="flex-grow mx-4 min-w-0">
              <p className="text-sm text-neutral-dark text-center truncate font-semibold">
                {episode.title}
              </p>
            </div>
            {/* Waveform Animation */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-0.5 h-4 bg-primary rounded transition-transform ${
                    isCurrentEpisode && isPlaying
                      ? ''
                      : 'animate-pulse'
                  }`}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animation: isCurrentEpisode && isPlaying
                      ? `wave 0.8s ease-in-out infinite alternate ${i * 0.15}s`
                      : undefined
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 text-sm text-neutral-mid">
          <span className="text-primary font-bold">{episode.category}</span>
          <span className="mx-2">|</span>
          <span>{episode.publishDate}</span>
          <p className="mt-3 font-medium text-neutral-dark text-base">
            {episode.title}
          </p>
        </div>

        {/* Các Số Khác Section */}
        <div className="mt-12 border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-dark mb-4">
            CÁC SỐ KHÁC
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSections[0].episodes.slice(0, 6).map((ep) => (
              <Link
                key={ep.id}
                to={`/radio/${ep.id}`}
                className="group flex gap-3 p-3 rounded-lg hover:bg-primary-light transition-all border-l-0 hover:border-l-[3px] hover:border-primary"
              >
                <div className="relative w-20 h-16 flex-shrink-0">
                  <div className="w-full h-full rounded-md bg-primary-dark" />
                  <div className="absolute top-1 left-1">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-neutral-dark line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-neutral-mid mt-1">
                    30 phút nghe • AM 610
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Gợi ý các Spotlight */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-accent-red rounded" />
            <h2 className="text-2xl font-headline font-bold text-neutral-dark">
              Gợi ý các spotlight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {radioSections[2].episodes.slice(0, 4).map((ep) => (
              <Link
                key={ep.id}
                to={`/radio/${ep.id}`}
                className="group flex gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  {/* Colorful gradient */}
                  <div
                    className="w-full h-full"
                    style={{
                      background: ep.id.includes('an')
                        ? 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)'
                        : 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)'
                    }}
                  />
                  <div className="absolute top-1 left-1">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-neutral-dark line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-neutral-mid mt-1">
                    FM 87.7 • 1 giờ trước
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

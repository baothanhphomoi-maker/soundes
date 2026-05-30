import { newsArticles } from '../data/newsData';

export default function NewsTicker() {
  // Duplicate articles for seamless loop
  const tickerItems = [...newsArticles.slice(0, 10), ...newsArticles.slice(0, 10)];

  return (
    <div className="ticker-container py-0">
      <div className="relative overflow-hidden bg-primary h-12 flex items-center">
        <div className="ticker-content flex items-center">
          {/* TIN MỚI Label */}
          <span className="inline-flex items-center gap-2 px-6 flex-shrink-0">
            <span className="bg-accent-gold text-ink-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg pulse-live">
              Tin Mới
            </span>
          </span>

          {/* Headlines */}
          {tickerItems.map((article, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 px-4 text-white text-sm whitespace-nowrap group cursor-pointer hover:text-yellow-200 transition-colors">
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(255,45,85,0.6)]" />
              <span className="group-hover:underline">{article.title}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

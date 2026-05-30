import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { Article, formatViews } from '../services/api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CategoryBadge  from './CategoryBadge';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'hero' | 'horizontal';
  delay?: number;
}

export default function ArticleCard({ article, variant = 'default', delay = 0 }: ArticleCardProps) {
  const scrollRef = useScrollAnimation();

  if (variant === 'hero') {
    return (
      <Link
        to={`/bai-viet/${article.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div
          ref={scrollRef}
          className="scroll-animate-in group news-card bg-white rounded-[16px] overflow-hidden shadow-md border-0 transition-all duration-300"
          style={{ transitionDelay: `${delay}ms` }}
        >
          <div className="relative card-image-container aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover card-image"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="mb-3">
              <CategoryBadge category={article.category} />
            </div>
            <h3
              className="card-title font-bold text-xl text-ink-900 mb-3"
              style={{ letterSpacing: '-0.2px', lineHeight: '1.45' }}
            >
              {article.title}
            </h3>
            <p className="text-ink-500 mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-ink-500" style={{ letterSpacing: '0' }}>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.timestamp}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {formatViews(article.views)} lượt xem
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/bai-viet/${article.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div
          ref={scrollRef}
          className="scroll-animate-in group flex news-card rounded-[16px] overflow-hidden shadow-md border-0 transition-all duration-300"
          style={{ transitionDelay: `${delay}ms` }}
        >
          <div className="relative w-40 md:w-48 h-32 flex-shrink-0 overflow-hidden card-image-container">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover card-image"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center py-4 px-6">
            <div className="mb-1.5">
              <CategoryBadge category={article.category} className="text-[10px] px-2 py-0.5" />
            </div>
            <h4
              className="card-title font-bold text-ink-900 mb-2 line-clamp-2"
              style={{ letterSpacing: '-0.2px', lineHeight: '1.45' }}
            >
              {article.title}
            </h4>
            <span className="text-xs text-ink-500">
              {article.timestamp}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card (grid layout)
  return (
    <Link
      to={`/bai-viet/${article.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        ref={scrollRef}
        className="scroll-animate-in group news-card bg-white rounded-[16px] overflow-hidden shadow-md border-0 hover:shadow-2xl hover:-translate-y-1"
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="relative card-image-container aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover card-image"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-4">
          <div className="mb-2.5">
            <CategoryBadge category={article.category} />
          </div>
          <h3
            className="card-title font-bold text-ink-900 mb-2 line-clamp-2"
            style={{ letterSpacing: '-0.2px', lineHeight: '1.45' }}
          >
            {article.title}
          </h3>
          <p className="text-ink-500 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-ink-500" style={{ letterSpacing: '0' }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.timestamp}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { fetchArticlesByCategory, Article } from '../services/api';
import { categories } from '../data/newsData';

interface CategoryPageProps {
  categorySlug: string;
}

export default function CategoryPage({ categorySlug }: CategoryPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const category = categories.find(cat => cat.slug === categorySlug);
  const categoryColor = category?.color || '#3B82F6';

  // Load articles from database
  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const data = await fetchArticlesByCategory(categorySlug, 50);
      setArticles(data);
      setLoading(false);
    }
    loadArticles();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadArticles, 30000);
    return () => clearInterval(interval);
  }, [categorySlug]);

  // Page transition effect
  useEffect(() => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Danh mục không tồn tại</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 12).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>

          {articles.length > 12 && (
            <div className="text-center mt-8">
              <button
                className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-colors"
                style={{ backgroundColor: categoryColor }}
              >
                Xem thêm tin tức
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

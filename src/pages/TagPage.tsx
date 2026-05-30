import { useParams, Link } from 'react-router-dom';
import { Hash, ArrowLeft } from 'lucide-react';
import { newsArticles } from '../data/newsData';
import ArticleCard from '../components/ArticleCard';

export default function TagPage() {
  const { tagName } = useParams();

  // Filter articles by tag
  const filteredArticles = newsArticles.filter(
    (article) => article.tags && article.tags.includes(tagName || '')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay về trang chủ
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Hash className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">#{tagName}</h1>
              <p className="text-gray-600 mt-1">{filteredArticles.length} bài viết</p>
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-2xl">
            Tất cả các bài viết được gắn thẻ "{tagName}"
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Hash className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không có bài viết nào
              </h3>
              <p className="text-gray-600">
                Chưa có bài viết nào được gắn thẻ "{tagName}"
              </p>
              <Link
                to="/"
                className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Về trang chủ
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 mt-12">
        <div className="max-w-[1280px] mx-auto px-6 text-center text-white/70 text-sm">
          © 2026 TIN TP.HCM. Bảo lưu mọi quyền.
        </div>
      </footer>
    </div>
  );
}

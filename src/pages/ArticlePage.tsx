import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  Clock,
  Eye,
  Share2,
  Facebook,
  Calendar,
  ChevronRight
} from 'lucide-react';
import CategoryBadge from '../components/CategoryBadge';
import ArticleCard from '../components/ArticleCard';
import { fetchArticles, trackArticleView, formatViews, Article } from '../services/api';

export default function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [mostReadArticles, setMostReadArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [currentViews, setCurrentViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const viewTrackedRef = useRef<string | null>(null);

  // Load all articles on mount
  useEffect(() => {
    async function loadArticles() {
      const articles = await fetchArticles(50);
      setAllArticles(articles);
      setLoading(false);
    }
    loadArticles();
  }, []);

  // Find article and track view when articleId changes
  useEffect(() => {
    if (!articleId || allArticles.length === 0) return;

    // Only track view if we haven't tracked this article yet
    if (viewTrackedRef.current === articleId) {
      return;
    }

    // Find the article
    const foundArticle = allArticles.find(a => a.id === articleId);
    if (foundArticle) {
      setArticle(foundArticle);
      setCurrentViews(foundArticle.views);

      // Track view in background (ghi nhận lượt xem thực tế) - chỉ 1 lần
      viewTrackedRef.current = articleId;
      trackArticleView(articleId).then(result => {
        if (result.success) {
          // Update views to real count from database
          setCurrentViews(result.views_count);
        }
      });

      // Get related articles
      const related = allArticles
        .filter(a => a.id !== articleId && a.category === foundArticle.category)
        .slice(0, 5);
      setRelatedArticles(related);

      // Get most read articles
      const mostRead = [...allArticles]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
      setMostReadArticles(mostRead);
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, [articleId, allArticles]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bài viết không tồn tại</h1>
          <Link to="/" className="text-blue-600 hover:underline">Quay về trang chủ</Link>
        </div>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (timestamp: string) => {
    return `${timestamp}`;
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999]"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #3B82F6, #06B6D4, #10B981)',
          boxShadow: '0 0 8px rgba(59,130,246,0.5)',
        }}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-all hover:translate-x-[-3px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link to={article.categorySlug || '/'} className="text-gray-500 hover:text-blue-600">
              {article.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {article.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[68%_32%] gap-8">
            {/* Main Content */}
            <div>
              {/* Article Header */}
              <div className="bg-white rounded-[20px] p-10 mb-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <div className="mb-4">
                  <CategoryBadge category={article.category} />
                </div>

                <h1 className="text-[32px] font-bold text-[#0D1117] mb-3 leading-tight" style={{ letterSpacing: '-0.5px' }}>
                  {article.title}
                </h1>

                <div className="italic text-[17px] text-[#475569] leading-relaxed p-4 border-l-4 border-blue-600 bg-[#F0F7FF] rounded-r-lg mb-5">
                  {article.excerpt}
                </div>

                <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-gray-900">{article.author}</div>
                      <div className="text-[12px] text-gray-500">Phóng viên</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-[13px] text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(currentViews)} lượt đọc</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>5 phút đọc</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                  <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                  >
                    {copied ? 'Đa sao chep!' : 'Sao chep link'}
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="mb-6">
                <div className="rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <p className="text-center text-[13px] text-gray-500 italic mt-3">
                  Hinh anh minh hoa cho bai viet
                </p>
              </div>

              {/* Article Body */}
              <div className="bg-white rounded-[16px] p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <div className="article-body max-w-[680px] mx-auto" style={{ fontSize: '17px' }}>
                  <p className="mb-6 leading-relaxed text-gray-800">
                    <strong>{article.title}</strong> - Day la mot trong nhung van de duoc quan tam hang dau tai TP.HCM trong thoi gian gan day. Cac co quan chuc nang dang no luc day manh cac bien phap nham giai quyet tinh trang nay mot cach hieu qua nhat.
                  </p>

                  <blockquote className="my-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-[5px] border-blue-600 rounded-r-2xl text-[20px] font-semibold text-[#1E3A5F] leading-relaxed">
                    "Chung toi cam ket se lam viec het minh de mang lai cuoc song tot dep hon cho nguoi dan thanh pho."
                  </blockquote>

                  <p className="mb-6 leading-relaxed text-gray-800">
                    Theo thong bao moi nhat tu cac co quan chuc nang, tinh hinh hien tai da co nhieu chuyen bien tich cuc. Nguoi dan da phan hoi rat tot voi cac chinh sach moi duoc ap dung trong thoi gian qua. Dac biet, cac du an trong diem dang duoc day nhanh tien do de kip hoan thanh theo dung ke hoach da dinh.
                  </p>

                  <div className="my-8 rounded-[12px] overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Hinh anh minh hoa"
                      className="w-full object-cover"
                    />
                    <p className="text-center text-[13px] text-gray-500 italic mt-2">
                      Canh nguoi dan TP.HCM trong cuoc song hang ngay
                    </p>
                  </div>

                  <h2 className="text-[22px] font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-50">
                    Chi tiet tinh hinh
                  </h2>

                  <p className="mb-6 leading-relaxed text-gray-800">
                    Duoc biet, trong tuan qua, cac co quan chuc nang da to chuc nhieu cuoc hop quan trong nham danh gia hien trang va de xuat cac giai phap kha thi. Sau khi xem xet ky luong, lanh dao thanh pho da quyet dinh trien khai mot loat bien phap cu the de cai thien tinh hinh trong thoi gian toi.
                  </p>

                  <p className="mb-6 leading-relaxed text-gray-800">
                    Mot trong nhung diem noi bat la viec thanh pho phoi hop voi cac doanh nghiep va to chuc xa hoi de dua ra cac chuong trinh ho tro thuc te cho nguoi dan. Dieu nay khong chi giup giai quyet van de truoc mat ma con tao nen tang vung chac cho su phat trien ben vung trong tuong lai.
                  </p>

                  <ul className="list-none p-0 mb-6 space-y-3">
                    {[
                      'Tang cuong hop tac giua cac co quan nha nuoc va doanh nghiep',
                      'Day manh cac chuong trinh an sinh xa hoi',
                      'Nang cao chat luong dich vu cong',
                      'Toi uu hoa quy trinh thu tuc hanh chinh'
                    ].map((item, idx) => (
                      <li key={idx} className="relative pl-6 text-gray-800 leading-relaxed">
                        <span className="absolute left-0 top-[9px] w-[6px] h-[6px] rounded-full bg-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="my-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="text-[13px] uppercase text-amber-800 font-bold mb-2">
                      Luu y
                    </div>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      Nguoi dan can theo doi thong tin chinh thuc tu cac co quan chuc nang de cap nhat tinh hinh moi nhat. Khong nen tin vao cac nguon tin khong chinh thong tren mang xa hoi.
                    </p>
                  </div>

                  <p className="mb-6 leading-relaxed text-gray-800">
                    Du kien trong thang toi, thanh pho se cong bo chi tiet ve cac buoc trien khai tiep theo. Nguoi dan co the tiep can thong tin qua cong thong tin dien tu chinh thuc hoac den truc tiep cac tru so hanh chinh de duoc tu van va ho tro.
                  </p>

                  <p className="leading-relaxed text-gray-800">
                    Voi su quyet tam cao do cua chinh quyen thanh pho va su dong long cua nguoi dan, tin rang tinh hinh se som duoc cai thien dang ke. Day la minh chung cho tinh than doan ket va y chi vuon len cua nguoi dan TP.HCM trong thoi ky hoi nhap va phat trien.
                  </p>
                </div>
              </div>

              {/* Article Footer */}
              <div className="bg-white rounded-[16px] p-8 mt-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-3 font-medium">Tags:</div>
                  <div className="flex flex-wrap gap-2">
                    {(article.tags || ['TP.HCM', 'Kinh te', 'Do thi']).map((tag) => (
                      <Link
                        key={tag}
                        to={`/tag/${tag}`}
                        className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Chia se bai viet nay:</div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform text-sm font-bold">
                      X
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-110 transition-transform text-xs font-bold">
                      Zalo
                    </button>
                    <button
                      onClick={copyLink}
                      className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="text-right mt-4">
                  <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                    Bao loi bai viet
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-5 space-y-4">
                {/* Related Articles */}
                <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-[3px] h-5 bg-blue-600 rounded" />
                    <h3 className="font-bold text-gray-900">Tin lien quan</h3>
                  </div>
                  <div className="space-y-3">
                    {relatedArticles.slice(0, 5).map((relArticle) => (
                      <Link
                        key={relArticle.id}
                        to={`/bai-viet/${relArticle.id}`}
                        className="flex gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group"
                      >
                        <img
                          src={relArticle.image}
                          alt={relArticle.title}
                          className="w-[72px] h-[54px] rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relArticle.title}
                          </h4>
                          <div className="text-[11px] text-gray-500 mt-1">{relArticle.timestamp}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Most Read */}
                <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-[3px] h-5 bg-blue-600 rounded" />
                    <h3 className="font-bold text-gray-900">Doc nhieu nhat</h3>
                  </div>
                  <div className="space-y-3">
                    {mostReadArticles.map((readArticle) => (
                      <Link
                        key={readArticle.id}
                        to={`/bai-viet/${readArticle.id}`}
                        className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group"
                      >
                        <h4 className="flex-1 text-[13px] font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {readArticle.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Topic Tags */}
                <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-[3px] h-5 bg-blue-600 rounded" />
                    <h3 className="font-bold text-gray-900">Chu de noi bat</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Kinh te', bg: 'bg-blue-50', color: 'text-blue-900' },
                      { label: 'Do thi', bg: 'bg-green-50', color: 'text-green-900' },
                      { label: 'Cong nghe', bg: 'bg-purple-50', color: 'text-purple-900' },
                      { label: 'Giao thong', bg: 'bg-orange-50', color: 'text-orange-900' },
                      { label: 'Giao duc', bg: 'bg-cyan-50', color: 'text-cyan-900' },
                      { label: 'Y te', bg: 'bg-red-50', color: 'text-red-900' },
                    ].map((topic) => (
                      <Link
                        key={topic.label}
                        to={`/tag/${topic.label}`}
                        className={`px-3 py-1.5 ${topic.bg} ${topic.color} rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all hover:scale-105`}
                      >
                        #{topic.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-[#0D1B2E] to-blue-700 rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">Email</div>
                  <h3 className="font-bold text-lg mb-2">Nhan tin moi moi ngay</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Cap nhat tin tuc som nhat vao hop thu cua ban
                  </p>
                  <input
                    type="email"
                    placeholder="Email cua ban"
                    className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white placeholder-white/50 mb-3 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="w-full px-4 py-2.5 bg-white text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                    Dang ky ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Grid */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-[20px] p-8 mt-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-[3px] h-6 bg-blue-600 rounded" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Bai viet khac trong chuyen muc
                  </h3>
                </div>
                <Link
                  to={article.categorySlug || '/'}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Xem them
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArticles.slice(0, 4).map((relArticle) => (
                  <ArticleCard
                    key={relArticle.id}
                    article={relArticle}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

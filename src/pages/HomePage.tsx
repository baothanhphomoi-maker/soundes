import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ChevronRight } from 'lucide-react';
import { fetchArticles, fetchRadioListenCounts, Article } from '../services/api';
import { radioEpisodes, formatListenerCount } from '../data/radioEpisodes';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

export default function HomePage() {
  const { playEpisode } = useAudioPlayer();
  const [index, setIndex] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [radioListenCounts, setRadioListenCounts] = useState<Record<string, number>>({});

  // Load articles from database on mount
  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles(50);
      setArticles(data);
      setLoading(false);
    }
    loadArticles();

    // Auto-refresh every 30 seconds to get new articles
    const interval = setInterval(loadArticles, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load radio listen counts from database
  useEffect(() => {
    async function loadRadioCounts() {
      const counts = await fetchRadioListenCounts();
      setRadioListenCounts(counts);
    }
    loadRadioCounts();

    // Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(loadRadioCounts, 3000);
    return () => clearInterval(interval);
  }, []);

  // Derived data - bài viết được sắp xếp theo thời gian (mới nhất trước)
  const topFour = articles.slice(0, 4);
  const sliderNews = articles.slice(0, 5);
  const cityNews = articles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 4);
  const wardNews = articles.filter(a => a.categorySlug === '/168-phuong-xa').slice(0, 4);
  const lifeNews = articles.filter(a => a.categorySlug === '/doi-song').slice(0, 4);
  const entNews = articles.filter(a => a.categorySlug === '/giai-tri').slice(0, 6);
  const radioList = radioEpisodes.slice(0, 4);

  useEffect(() => {
    if (sliderNews.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % sliderNews.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [sliderNews.length]);

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
    <>
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {/* 1. 4 KHỐI LINK NHANH ĐẦU TRANG */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {topFour.map((article) => (
            <Link key={article.id} to={`/bai-viet/${article.id}`} className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-3 items-center">
              <img src={article.image} alt={article.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#0057B8] transition-colors">{article.title}</h3>
            </Link>
          ))}
        </section>

        {/* 2. HERO SLIDER */}
        <section className="relative w-full aspect-[21/9] md:aspect-[25/10] overflow-hidden mb-16 rounded-2xl shadow-2xl bg-gray-200">
          <AnimatePresence mode='wait'>
            {sliderNews.length > 0 && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <img src={sliderNews[index].image} className="w-full h-full object-cover" alt={sliderNews[index].title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl"
                  >
                    <span className="bg-[#0057B8] text-white px-3 py-1.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest inline-block mb-4">
                      Tin nổi bật
                    </span>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight cursor-pointer">
                      {sliderNews[index].title}
                    </h1>
                    <p className="text-gray-200 text-sm md:text-lg line-clamp-2 font-medium opacity-90 mb-6">
                      {sliderNews[index].excerpt}
                    </p>
                    <Link
                      to={`/bai-viet/${sliderNews[index].id}`}
                      className="flex items-center gap-2 text-white font-bold hover:text-blue-300 transition-all group w-fit"
                    >
                      Đọc tiếp <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-6 right-12 hidden md:flex gap-3">
            {sliderNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${index === i ? 'w-8 bg-[#0057B8]' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </section>

        {/* 3. THÀNH PHỐ HÔM NAY & RADIO */}
        <div className="grid grid-cols-12 gap-12 mb-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#0057B8]" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Thành phố hôm nay</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            {cityNews.map((art) => (
              <Link key={art.id} to={`/bai-viet/${art.id}`} className="flex gap-4 group border-b border-gray-100 pb-6 mb-6">
                <img src={art.image} className="w-32 md:w-48 h-20 md:h-28 object-cover rounded-xl" />
                <div className="py-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0057B8] line-clamp-2">{art.title}</h3>
                  <p className="text-gray-500 text-sm hidden md:line-clamp-2">{art.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-[#0057B8]" />
              <h2 className="text-lg font-bold uppercase tracking-tight">Radio Online</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            <div className="space-y-6">
              {radioList.map((ep) => {
                const listenCount = radioListenCounts[ep.id] || 0;
                return (
                  <div key={ep.id} onClick={() => playEpisode(ep)} className="flex gap-4 cursor-pointer group p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-[#0057B8] group-hover:bg-[#0057B8] group-hover:text-white transition-all">
                      <Mic size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0057B8] line-clamp-2">{ep.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400 uppercase font-bold">{ep.host.name}</p>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{formatListenerCount(listenCount)} lượt nghe</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. 168 PHƯỜNG - XÃ */}
        <section className="mb-16">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 bg-[#0057B8]" />
              <h2 className="text-xl font-bold uppercase tracking-tight">168 Phường - Xã</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            <Link to="/168-phuong-xa" className="text-sm text-[#0057B8] font-bold hover:underline whitespace-nowrap">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wardNews.map((art) => (
              <Link key={art.id} to={`/bai-viet/${art.id}`} className="flex flex-col gap-3 group">
                <div className="overflow-hidden rounded-xl">
                    <img src={art.image} className="w-full h-52 object-cover transition-transform group-hover:scale-105 duration-500" />
                </div>
                <h3 className="font-bold text-base group-hover:text-[#0057B8] line-clamp-2">{art.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 5. GÓC NHÌN (DARK SECTION) */}
      <section className="bg-[#000B2B] w-full py-16">
        <div className="max-w-[1280px] mx-auto px-6 text-white">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Góc nhìn chuyên gia</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {lifeNews.slice(0, 2).map((art) => (
              <Link key={art.id} to={`/bai-viet/${art.id}`} className="group block">
                <div className="w-full h-[380px] bg-gray-800 rounded-2xl mb-5 overflow-hidden">
                   <img src={art.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                </div>
                <h3 className="font-bold text-2xl group-hover:text-blue-400 transition-colors leading-snug">{art.title}</h3>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {lifeNews.slice(0, 3).map((art) => (
              <Link key={art.id} to={`/bai-viet/${art.id}`} className="group block">
                <div className="w-full h-[240px] bg-gray-800 rounded-xl mb-4 overflow-hidden">
                   <img src={art.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-lg group-hover:text-blue-400 line-clamp-2">{art.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ĐỜI SỐNG */}
      <main className="max-w-[1280px] mx-auto px-6 py-20">
        <section>
          <div className="flex items-center gap-3 justify-between mb-8">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 bg-[#0057B8]" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Đời sống</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            <Link to="/doi-song" className="text-sm text-[#0057B8] font-bold hover:underline">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {lifeNews.length > 0 && (
            <div className="lg:col-span-7">
              <Link to={`/bai-viet/${lifeNews[0].id}`} className="group block">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img src={lifeNews[0].image} className="w-full h-[380px] object-cover group-hover:scale-105 duration-700" />
                </div>
                <h3 className="mt-4 text-2xl font-black group-hover:text-[#0057B8] leading-tight transition-colors line-clamp-2">{lifeNews[0].title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{lifeNews[0].excerpt}</p>
              </Link>
            </div>
          )}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {lifeNews.slice(1, 4).map((art) => (
                <Link key={art.id} to={`/bai-viet/${art.id}`} className="flex gap-4 group pb-4 border-b border-gray-100 last:border-0">
                  <img src={art.image} className="w-28 h-24 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex flex-col justify-start flex-1 min-w-0">
                    <h4 className="font-bold text-sm group-hover:text-[#0057B8] transition-colors line-clamp-2 leading-snug">{art.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{art.timestamp}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{art.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. GIẢI TRÍ */}
      <main className="max-w-[1280px] mx-auto px-6 py-10 pb-20">
        <section>
          <div className="flex items-center justify-between gap-3 mb-10">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 bg-[#0057B8]" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Giải trí</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            <Link to="/giai-tri" className="text-sm text-[#0057B8] font-bold hover:underline">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {entNews.map((art) => (
              <Link key={art.id} to={`/bai-viet/${art.id}`} className="group block space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <img src={art.image} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-bold text-lg group-hover:text-[#0057B8] transition-colors leading-snug line-clamp-2">{art.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {art.excerpt || "Khám phá những góc nhìn văn hóa, sự kiện giải trí đặc sắc nhất diễn ra tại thành phố."}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

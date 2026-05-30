import { Eye, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article, formatViews } from '../data/newsData';

interface MostReadSectionProps {
  articles: Article[];
}

export default function MostReadSection({ articles }: MostReadSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-ink-950 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        
        {/* TIÊU ĐỀ KHU VỰC - SANG TRỌNG & HIỆN ĐẠI */}
        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-ink-100 dark:border-ink-900">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-glow">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-headline font-bold text-ink-900 dark:text-white tracking-tight">
            Xu hướng <span className="text-primary dark:text-primary-glow font-medium">đọc nhiều</span>
          </h2>
        </div>

        {/* DANH SÁCH BÀI VIẾT TỐI ƯU CÂN ĐỐI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {articles?.map((article, idx) => {
            // Định màu gradient tinh tế riêng cho top 3 số thứ tự
            const rankColors = 
              idx === 0 ? 'text-amber-500/20 dark:text-amber-400/10 font-bold' : 
              idx === 1 ? 'text-slate-400/30 dark:text-slate-400/10 font-bold' : 
              idx === 2 ? 'text-amber-700/20 dark:text-amber-600/10 font-bold' : 
              'text-ink-200/40 dark:text-ink-800/30 font-medium';

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex gap-5 p-3 -mx-3 rounded-2xl hover:bg-ink-50/60 dark:hover:bg-ink-900/40 transition-all duration-300"
              >
                {/* SỐ THỨ TỰ TYPOGRAPHY NGHỆ THUẬT (Thay cho ô vuông đen cũ) */}
                <div className={`absolute -left-2 top-2 text-5xl md:text-6xl font-headline select-none pointer-events-none tracking-tighter ${rankColors}`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* KHỐI ẢNH ĐƯỢC THU GỌN VÀ SANG TRỌNG HƠN */}
                <div className="relative w-32 h-24 md:w-44 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-ink-100 dark:bg-ink-900 pl-4 z-10">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Hiệu ứng tráng gương bóng khi hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
                  </div>
                </div>

                {/* KHỐI CHỮ ĐƯỢC "THỞ" VÀ CÂN BẰNG TỶ LỆ */}
                <div className="flex flex-col justify-center flex-1 z-10 pl-2">
                  {/* Tên danh mục chữ nhỏ thanh lịch */}
                  <span className="text-[11px] font-bold text-primary dark:text-primary-glow tracking-wider uppercase mb-1.5 block">
                    {article.category}
                  </span>
                  
                  {/* Tiêu đề thanh thoát, khoảng cách dòng hợp lý */}
                  <h3 className="font-body font-bold text-sm md:text-base text-ink-900 dark:text-ink-100 line-clamp-2 mb-2 leading-snug group-hover:text-primary dark:group-hover:text-primary-glow transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  {/* Meta data tinh giản */}
                  <div className="flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500 font-light">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 opacity-70" />
                      {formatViews(article.views)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-ink-200 dark:bg-ink-800" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      {article.timestamp}
                    </span>
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
import { Link } from 'react-router-dom';
import { Clock, Bookmark, AlertTriangle } from 'lucide-react';

export default function HeroSection() {
  // Giả lập dữ liệu cho 3 khung tin nhỏ nằm ngang phía trên
  const topThreeArticles = [
    {
      id: '1',
      title: 'Hệ thống xe buýt điện đầu tiên hoạt nghiệm tại TP.HCM',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
      time: '20 phút trước',
    },
    {
      id: '2',
      title: 'Chợ Bến Thành mở cửa 24/7 phục vụ khách quốc tế',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400',
      time: '45 phút trước',
    },
    {
      id: '3',
      title: 'Hồ Con Rùa cải tạo thành không gian xanh hiện đại',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
      time: '18 phút trước',
    }
  ];

  // Giả lập dữ liệu cho cột tin tức kế bên ảnh to (Layout Báo chí chuyên nghiệp)
  const sideNews = [
    { id: 'h1', tag: 'Tin giả', title: 'Cảnh báo thông tin sai lệch về bài thuốc trị ung thư bằng hành tây', time: '20 phút trước' },
    { id: 'h2', tag: 'Y tế', title: 'Kiểm tra sức khỏe phổi bằng phương pháp nín thở là thiếu cơ sở khoa học', time: '1 giờ trước' },
    { id: 'h3', tag: 'Xã hội', title: 'Xử phạt trường hợp đăng tải nội dung kích động về vaccine phòng dịch', time: '2 giờ trước' },
    { id: 'h4', tag: 'Giao thông', title: 'Thông tin phân luồng tạm thời tại các tuyến đường trung tâm quận 1', time: '3 giờ trước' }
  ];

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-6 bg-[#F8FAFC]">
      
      {/* SECTION: 3 KHUNG NHỎ NẰM NGANG (Yêu cầu 3 - Thay thế hình ảnh mất thẩm mỹ) */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#0057B8] rounded-full" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight uppercase">Tin mới nhất</h2>
          </div>
          <Link to="/tin-moi" className="text-xs font-semibold text-[#0057B8] hover:underline">
            Xem tất cả
          </Link>
        </div>
        
        {/* Grid 3 cột đều nhau, nhỏ gọn thanh thoát */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThreeArticles.map((art) => (
            <Link key={art.id} to={`/bai-viet/${art.id}`} className="group bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex gap-3 hover:shadow-md transition-all">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h3 className="text-xs font-bold text-slate-800 line-clamp-3 leading-snug group-hover:text-[#0057B8] transition-colors">
                  {art.title}
                </h3>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.time}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION: HERO BOX BÁO CHÍ CHUYÊN NGHIỆP (Yêu cầu 4) */}
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* CỘT TRÁI (70% - 7/10): Khung ảnh tiêu điểm siêu rộng, mang đậm phong cách tạp chí */}
        <div className="lg:col-span-7">
          <Link to="/bai-viet/dac-biet" className="group relative block w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-md bg-slate-900">
            {/* Ảnh nền mờ lớn chất lượng cao */}
            <img 
              src="https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&q=80&w=1200" 
              alt="Tiêu điểm TP.HCM" 
              className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
            />
            {/* Phủ dải màu gradient mờ tối để làm nổi bật text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Nội dung chữ đè lên ảnh */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block bg-[#FF2D55] text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 shadow-sm">
                Tiêu điểm hôm nay
              </span>
              <h1 className="text-xl md:text-3xl font-black text-white leading-tight font-headline tracking-tight group-hover:text-amber-300 transition-colors uppercase line-clamp-3">
                HỒ CHÍ MINH: CHUYỂN MÌNH MẠNH MẼ VỚI CÔNG NGHỆ NƯỚC TÁI CHẾ VÀ KINH TẾ TUẦN HOÀN MỚI
              </h1>
            </div>
          </Link>
        </div>

        {/* CỘT PHẢI (30% - 3/10): Khung tin tức dòng sự kiện kế bên ảnh */}
        <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FF2D55]" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Chống tin giả & Điểm tin</h2>
          </div>
          
          <div className="flex-1 divide-y divide-slate-100 px-4 overflow-y-auto">
            {sideNews.map((news) => (
              <div key={news.id} className="py-3.5 group cursor-pointer">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-extrabold text-[#FF2D55] uppercase tracking-wide">
                    {news.tag}
                  </span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Bookmark className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                  </div>
                </div>
                <h3 className="text-xs font-semibold text-slate-700 leading-snug line-clamp-2 group-hover:text-[#0057B8] transition-colors">
                  {news.title}
                </h3>
                <span className="text-[10px] text-slate-400 block mt-1">{news.time}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
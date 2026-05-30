import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, CloudSun, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState<{ temp: number | string; desc: string }>({ 
    temp: "--", 
    desc: "Đang tải..." 
  });

  // 1. Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Cập nhật thời tiết từ Open-Meteo (tự động cập nhật mỗi 30 phút)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=10.7769&longitude=106.6972&current=temperature_2m,weather_code&timezone=Asia%2FBangkok`);
        const data = await res.json();
        
        if (data.current) {
          const code = data.current.weather_code;
          // Logic mô tả thời tiết đơn giản theo mã WMO
          const desc = code <= 3 ? "Trời đẹp" : code <= 55 ? "Mưa nhẹ" : "Nhiều mây";
          
          setWeather({ 
            temp: Math.round(data.current.temperature_2m), 
            desc: desc 
          });
        }
      } catch (err) {
        console.error("Lỗi lấy thời tiết:", err);
      }
    };

    fetchWeather(); // Gọi lần đầu khi mount
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // Tự động làm mới mỗi 30 phút
    return () => clearInterval(interval);
  }, []);

  const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const dateStr = `${time.getDate()}, tháng ${time.getMonth() + 1}, ${time.getFullYear()}`;

  const navItems = [
    { label: 'Trang chủ', slug: '/' },
    { label: 'Thành phố hôm nay', slug: '/thanh-pho' },
    { label: '168 phường - xã', slug: '/168-phuong-xa' },
    { label: 'Góc nhìn', slug: '/goc-nhin' },
    { label: 'Đời sống', slug: '/doi-song' },
    { label: 'Giải trí', slug: '/giai-tri' },
    { label: 'Radio', slug: '/radio' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* TẦNG 1: Lịch, Thời tiết & Logo */}
      <div className="max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="font-black text-[#0057B8] text-xl tracking-tight">TIN TP. HỒ CHÍ MINH</div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-9 h-9 text-[#0057B8]" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold uppercase text-slate-800">{days[time.getDay()]}</span>
                <span className="text-xs text-slate-500 font-medium">{dateStr}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudSun className="w-9 h-9 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-800">{weather.temp}°C - {weather.desc}</span>
                <span className="text-xs text-slate-500 font-medium">TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center bg-slate-100 rounded-full px-5 py-2.5 border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-600 w-32 placeholder-slate-400"
          />
        </div>
      </div>

      {/* TẦNG 2: MENU */}
      <div className="max-w-[1280px] mx-auto px-6 border-b-[3px] border-slate-100">
        <nav className="h-10 flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.slug;
            return (
              <Link key={item.slug} to={item.slug} className={`h-full flex items-center text-sm font-bold transition-all relative group ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>
                {item.label}
                <div className={`absolute bottom-[-3px] left-0 h-[3px] bg-[#0057B8] transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
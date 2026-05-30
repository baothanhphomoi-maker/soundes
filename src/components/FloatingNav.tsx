import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categories } from '../data/newsData';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

export default function FloatingNav() {
  // THÊM DÒNG NÀY: Ép component không hiển thị gì cả để xóa hoàn toàn thanh lơ lửng
  return null;

  const [show, setShow] = useState(false);
  const location = useLocation();
  const { currentEpisode } = useAudioPlayer();

  const isRadioPage = location.pathname.startsWith('/radio');
  const navItems = categories.slice(0, -1);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show || isRadioPage) return null;

  // Push up when mini player is visible
  const bottomPosition = currentEpisode ? '88px' : '16px';

  return (
    <div
      className="hidden md:block fixed left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300"
      style={{ bottom: bottomPosition }}
    >
      <div className="glass-nav flex items-center gap-1 rounded-full p-1.5">
        {navItems.map((cat) => (
          <Link
            key={cat.id}
            to={cat.slug}
            className={`floating-nav-btn px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              location.pathname === cat.slug
                ? 'bg-white text-primary'
                : 'text-white hover:bg-white/20'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
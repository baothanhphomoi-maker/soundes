import { Link } from 'react-router-dom';
import { Newspaper, Radio, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">TIN TP.HCM</h3>
                <p className="text-sm text-gray-400">Trang tin điện tử</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Cập nhật tin tức nóng hổi về chính trị - xã hội, đời sống, văn hóa tại TP.HCM 24/7.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-400 flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-pink-600 flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Chuyên mục</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/thanh-pho" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Thành phố hôm nay
                </Link>
              </li>
              <li>
                <Link to="/168-phuong-xa" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  168 Phường-Xã
                </Link>
              </li>
              <li>
                <Link to="/doi-song" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Đời sống
                </Link>
              </li>
              <li>
                <Link to="/goc-nhin" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Góc nhìn chuyên gia
                </Link>
              </li>
              <li>
                <Link to="/giai-tri" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Giải trí
                </Link>
              </li>
              <li>
                <Link to="/radio" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Radio Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Dịch vụ</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Đăng ký nhận tin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Quảng cáo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Góp ý - Phản hồi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Tòa soạn: 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(028) 3893 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">contact@tintphcm.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-white/5 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xl font-bold mb-2">Đăng ký nhận bản tin</h4>
              <p className="text-gray-400 text-sm">Nhận tin tức mới nhất mỗi ngày vào hộp thư của bạn</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 TIN TP.HCM. Bảo lưu mọi quyền.
            </p>
            <p className="text-gray-500 text-sm">
              Giấy phép hoạt động số 123/GP-BTTTT do Bộ TT&TT cấp
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

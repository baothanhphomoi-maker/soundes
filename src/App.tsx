import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { radioEpisodes } from './data/radioEpisodes';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

// Các thành phần Layout
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';
import ReadingProgressBar from './components/ReadingProgressBar';
import MiniPlayer from './components/radio/MiniPlayer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Các trang
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import RadioPage from './pages/RadioPage';
import ArticlePage from './pages/ArticlePage';
import TagPage from './pages/TagPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  return (
    <AudioPlayerProvider episodes={radioEpisodes}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-ink-50 transition-colors duration-300 relative flex flex-col">
          <ReadingProgressBar />

          {/* Header được ghim cố định ở đây */}
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <Header />
          </div>

          {/* Nội dung thay đổi theo đường dẫn */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thanh-pho" element={<CategoryPage categorySlug="/thanh-pho" />} />
              <Route path="/168-phuong-xa" element={<CategoryPage categorySlug="/168-phuong-xa" />} />
              <Route path="/doi-song" element={<CategoryPage categorySlug="/doi-song" />} />
              <Route path="/goc-nhin" element={<CategoryPage categorySlug="/goc-nhin" />} />
              <Route path="/giai-tri" element={<CategoryPage categorySlug="/giai-tri" />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/bai-viet/:articleId" element={<ArticlePage />} />
              <Route path="/tag/:tagName" element={<TagPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Footer cố định ở cuối */}
          <Footer />

          <FloatingNav />
          <MiniPlayer />
        </div>
      </Router>
    </AudioPlayerProvider>
  );
}
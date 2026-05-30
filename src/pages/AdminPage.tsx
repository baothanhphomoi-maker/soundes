import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Newspaper, Radio, LogOut, Plus, CreditCard as Edit, Trash2, Save, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  category_slug: string;
  image: string;
  author: string;
  tags: string[];
  created_at: string;
  views_count: number;
}

interface RadioEpisode {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  thumbnail: string;
  category: string;
  host_name: string;
  duration: number;
  listen_count: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'radio'>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [episodes, setEpisodes] = useState<RadioEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingEpisode, setEditingEpisode] = useState<RadioEpisode | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    // Load articles
    const { data: articlesData } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (articlesData) setArticles(articlesData);

    // Load radio episodes
    const { data: episodesData } = await supabase
      .from('radio_episodes')
      .select('*')
      .order('created_at', { ascending: false });
    if (episodesData) setEpisodes(episodesData);

    setLoading(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Article CRUD
  const handleAddArticle = () => {
    setEditingArticle({
      id: '',
      title: '',
      excerpt: '',
      category: 'Thành phố hôm nay',
      category_slug: '/thanh-pho',
      image: 'https://picsum.photos/seed/new/800/450',
      author: 'Admin',
      tags: [],
      created_at: new Date().toISOString(),
      views_count: 0,
    });
  };

  const handleSaveArticle = async () => {
    if (!editingArticle) return;

    if (editingArticle.id) {
      // Update
      await supabase
        .from('articles')
        .update({
          title: editingArticle.title,
          excerpt: editingArticle.excerpt,
          category: editingArticle.category,
          category_slug: editingArticle.category_slug,
          image: editingArticle.image,
          author: editingArticle.author,
          tags: editingArticle.tags,
        })
        .eq('id', editingArticle.id);
    } else {
      // Insert
      await supabase.from('articles').insert({
        title: editingArticle.title,
        excerpt: editingArticle.excerpt,
        category: editingArticle.category,
        category_id: editingArticle.category_slug.replace('/', ''),
        category_slug: editingArticle.category_slug,
        image: editingArticle.image,
        author: editingArticle.author,
        tags: editingArticle.tags,
      });
    }

    setEditingArticle(null);
    loadData();
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      await supabase.from('articles').delete().eq('id', id);
      loadData();
    }
  };

  // Radio Episode CRUD
  const handleAddEpisode = () => {
    const newId = `ep-${String(episodes.length + 1).padStart(3, '0')}`;
    setEditingEpisode({
      id: newId,
      title: '',
      description: '',
      audio_url: '',
      thumbnail: 'https://picsum.photos/seed/new/800/800',
      category: 'Thời Sự',
      host_name: 'Admin',
      duration: 1800,
      listen_count: 0,
    });
  };

  const handleSaveEpisode = async () => {
    if (!editingEpisode) return;

    if (editingEpisode.listen_count > 0) {
      // Update existing
      await supabase
        .from('radio_episodes')
        .update({
          title: editingEpisode.title,
          description: editingEpisode.description,
          host_name: editingEpisode.host_name,
          duration: editingEpisode.duration,
        })
        .eq('id', editingEpisode.id);
    } else {
      // Insert new
      await supabase.from('radio_episodes').insert({
        id: editingEpisode.id,
        title: editingEpisode.title,
        description: editingEpisode.description,
        host_name: editingEpisode.host_name,
        duration: editingEpisode.duration,
      });
    }

    setEditingEpisode(null);

    // Also update local data file
    alert('Đã lưu vào database. Bạn cần cập nhật file src/data/radioEpisodes.ts để đồng bộ metadata (audioUrl, thumbnail, category).');

    loadData();
  };

  const handleDeleteEpisode = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa episode này?')) {
      await supabase.from('radio_episodes').delete().eq('id', id);
      loadData();
    }
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'articles'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Newspaper size={20} />
            Bài viết ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('radio')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'radio'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Radio size={20} />
            Radio Episodes ({episodes.length})
          </button>
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAddArticle}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
                Thêm bài viết mới
              </button>
            </div>

            {editingArticle && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingArticle.id ? 'Sửa bài viết' : 'Thêm bài viết mới'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên mục</label>
                    <select
                      value={editingArticle.category_slug}
                      onChange={(e) => {
                        const categoryMap: Record<string, { name: string; slug: string }> = {
                          '/thanh-pho': { name: 'Thành phố hôm nay', slug: '/thanh-pho' },
                          '/168-phuong-xa': { name: '168 Phường-Xã', slug: '/168-phuong-xa' },
                          '/doi-song': { name: 'Đời sống', slug: '/doi-song' },
                          '/goc-nhin': { name: 'Góc nhìn', slug: '/goc-nhin' },
                          '/giai-tri': { name: 'Giải trí', slug: '/giai-tri' },
                        };
                        const selected = categoryMap[e.target.value];
                        setEditingArticle({
                          ...editingArticle,
                          category: selected.name,
                          category_slug: selected.slug,
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="/thanh-pho">Thành phố hôm nay</option>
                      <option value="/168-phuong-xa">168 Phường-Xã</option>
                      <option value="/doi-song">Đời sống</option>
                      <option value="/goc-nhin">Góc nhìn</option>
                      <option value="/giai-tri">Giải trí</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
                    <textarea
                      value={editingArticle.excerpt}
                      onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link ảnh</label>
                    <input
                      type="text"
                      value={editingArticle.image}
                      onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                    <input
                      type="text"
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveArticle}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingArticle(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X size={20} />
                    Hủy
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bài viết
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chuyên mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lượt xem
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{article.title}</div>
                            <div className="text-sm text-gray-500">{article.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{article.views_count}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setEditingArticle(article)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Radio Tab */}
        {activeTab === 'radio' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAddEpisode}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
                Thêm episode mới
              </button>
            </div>

            {editingEpisode && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Thêm episode mới</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Sau khi lưu vào database, bạn cần cập nhật file{' '}
                    <code className="bg-yellow-100 px-1">src/data/radioEpisodes.ts</code> để thêm:
                  </p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                    <li>audioUrl - Link file audio thực tế</li>
                    <li>thumbnail - Link hình ảnh</li>
                    <li>category, categoryColor - Thể loại</li>
                    <li>host.name, host.avatar - Thông tin host</li>
                    <li>publishDate, publishTime - Thời gian đăng</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Episode</label>
                    <input
                      type="text"
                      value={editingEpisode.id}
                      onChange={(e) => setEditingEpisode({ ...editingEpisode, id: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ep-009"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      value={editingEpisode.title}
                      onChange={(e) => setEditingEpisode({ ...editingEpisode, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                      value={editingEpisode.description}
                      onChange={(e) => setEditingEpisode({ ...editingEpisode, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên Host</label>
                    <input
                      type="text"
                      value={editingEpisode.host_name}
                      onChange={(e) => setEditingEpisode({ ...editingEpisode, host_name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng (giây)</label>
                    <input
                      type="number"
                      value={editingEpisode.duration}
                      onChange={(e) => setEditingEpisode({ ...editingEpisode, duration: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveEpisode}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingEpisode(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X size={20} />
                    Hủy
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Episode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lượt nghe
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {episodes.map((episode) => (
                    <tr key={episode.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{episode.id}</div>
                          <div className="text-sm text-gray-500">{episode.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{episode.host_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {Math.floor(episode.duration / 60)} phút
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{episode.listen_count}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

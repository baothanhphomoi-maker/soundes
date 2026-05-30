export interface RadioEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audioUrl: string;
  duration: number; // in seconds
  category: string;
  categoryColor: string;
  host: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  publishTime: string;
  listenerCount: number;
  tags: string[];
  isLive?: boolean;
}

// Generate beautiful thumbnails with gradients
const generateThumbnail = (seed: string): string => {
  return `https://picsum.photos/seed/${seed}/800/800`;
};

export const radioEpisodes: RadioEpisode[] = [
  {
    id: 'ep-001',
    title: 'Bản Tin Sáng: TP.HCM Phát Triển Hạ Tầng Metro Số 1',
    description: 'Cập nhật mới nhất về dự án Metro số 1 Bến Thành - Suối Tiên, tiến độ thi công và kế hoạch vận hành thử vào tháng 7/2026. Chương trình có sự tham gia của chuyên gia giao thông đô thị.',
    thumbnail: generateThumbnail('metro-news'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 1800, // 30 min
    category: 'Thời Sự',
    categoryColor: '#1E3A8A',
    host: {
      name: 'Minh Tuấn',
      avatar: 'MT',
    },
    publishDate: '2026-05-29',
    publishTime: '07:00',
    listenerCount: 24567,
    tags: ['Giao thông', 'Hạ tầng', 'TP.HCM'],
    isLive: true,
  },
  {
    id: 'ep-002',
    title: 'Góc Nhìn Chuyên Gia: Tương Lai Kinh Tế Số Việt Nam',
    description: 'Phân tích sâu về chuyển đổi số trong nền kinh tế Việt Nam, cơ hội và thách thức cho doanh nghiệp SME. Với sự tham gia của TS. Nguyễn Văn A - Chuyên gia kinh tế.',
    thumbnail: generateThumbnail('digital-economy'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 2400, // 40 min
    category: 'Kinh Tế',
    categoryColor: '#047857',
    host: {
      name: 'Thanh Hà',
      avatar: 'TH',
    },
    publishDate: '2026-05-28',
    publishTime: '19:00',
    listenerCount: 18934,
    tags: ['Kinh tế số', 'Chuyển đổi số', 'Doanh nghiệp'],
  },
  {
    id: 'ep-003',
    title: 'Culture Talk: Làn Sóng Âm Nhạc Indie Việt',
    description: 'Khám phá sự bùng nổ của âm nhạc indie Việt Nam, từ những ca sĩ tự sáng tác đến các festival âm nhạc độc lập. Phỏng vấn đặc biệt với nhạc sĩ Hoàng Touliver.',
    thumbnail: generateThumbnail('indie-music'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 2700, // 45 min
    category: 'Văn Hóa',
    categoryColor: '#7C3AED',
    host: {
      name: 'Phương Linh',
      avatar: 'PL',
    },
    publishDate: '2026-05-28',
    publishTime: '20:00',
    listenerCount: 34210,
    tags: ['Âm nhạc', 'Indie', 'Văn hóa'],
  },
  {
    id: 'ep-004',
    title: 'Health Hub: Sleep Science - Giấc Ngủ Và Sức Khỏe',
    description: 'Tập đặc biệt về khoa học giấc ngủ với BS. Trần Thị B - Giảng viên Đại học Y Dược TP.HCM. Cẩm nang toàn diện về sleep hygiene và tips cải thiện giấc ngủ.',
    thumbnail: generateThumbnail('sleep-health'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 2100, // 35 min
    category: 'Sức Khỏe',
    categoryColor: '#059669',
    host: {
      name: 'Kim Chi',
      avatar: 'KC',
    },
    publishDate: '2026-05-27',
    publishTime: '21:00',
    listenerCount: 15892,
    tags: ['Sức khỏe', 'Sleep', 'Lifestyle'],
  },
  {
    id: 'ep-005',
    title: 'Tech Tonight: AI Revolution Trong Cuộc Sống',
    description: 'Đánh giá tác động của trí tuệ nhân tạo trong đời sống hàng ngày, từ trợ lý ảo đến ứng dụng trong y tế và giáo dục. Cùng đón đọc các xu hướng AI 2026.',
    thumbnail: generateThumbnail('ai-revolution'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 1920, // 32 min
    category: 'Thời Sự',
    categoryColor: '#1E3A8A',
    host: {
      name: 'Đức Thịnh',
      avatar: 'ĐT',
    },
    publishDate: '2026-05-27',
    publishTime: '18:00',
    listenerCount: 28345,
    tags: ['AI', 'Công nghệ', 'Xu hướng'],
  },
  {
    id: 'ep-006',
    title: 'Sport Focus: SEA Games 33 - Hành Trình Vàng',
    description: 'Special episode về thành tích ấn tượng của đoàn thể thao Việt Nam tại SEA Games 33. Phỏng vấn độc quyền với HLV Park Hang-seo và các VĐV tiêu biểu.',
    thumbnail: generateThumbnail('sea-games'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 3600, // 60 min
    category: 'Thể Thao',
    categoryColor: '#DC2626',
    host: {
      name: 'Việt Anh',
      avatar: 'VA',
    },
    publishDate: '2026-05-26',
    publishTime: '20:00',
    listenerCount: 41203,
    tags: ['SEA Games', 'Thể thao', 'Việt Nam'],
  },
  {
    id: 'ep-007',
    title: 'Entertainment Weekly: Phim Việt 2026 - Cuộc Cách Mạng Mới',
    description: 'Review các bom tấn phim Việt ra mắt năm 2026, phân tích sự trỗi dậy của điện ảnh Việt Nam. Đặc biệt: phỏng vấn đạo diễn Victor Vũ về dự án mới nhất.',
    thumbnail: generateThumbnail('vietnam-cinema'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 2100, // 35 min
    category: 'Giải Trí',
    categoryColor: '#DB2777',
    host: {
      name: 'Ngọc Ánh',
      avatar: 'NA',
    },
    publishDate: '2026-05-26',
    publishTime: '19:00',
    listenerCount: 37689,
    tags: ['Điện ảnh', 'Phim Việt', 'Review'],
  },
  {
    id: 'ep-008',
    title: 'Business Corner: Startup Stories - Từ 0 Đến Series A',
    description: 'Series đặc biệt kể chuyện các startup Việt thành công, bài học từ founders và chiến lược gọi vốn. Ep 1: Coffee House - Từ quán nhỏ đến chuỗi F&B hàng đầu.',
    thumbnail: generateThumbnail('startup-stories'),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 2700, // 45 min
    category: 'Kinh Tế',
    categoryColor: '#047857',
    host: {
      name: 'Hoàng Yến',
      avatar: 'HY',
    },
    publishDate: '2026-05-25',
    publishTime: '17:00',
    listenerCount: 26781,
    tags: ['Startup', 'Kinh doanh', 'Series A'],
  },
];

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatListenerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const getRelativeTime = (dateStr: string, timeStr: string): string => {
  const publishDate = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();
  const diffMs = now.getTime() - publishDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Vừa xong';
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return publishDate.toLocaleDateString('vi-VN');
};

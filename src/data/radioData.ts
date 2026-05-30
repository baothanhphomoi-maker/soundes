export interface RadioEpisode {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  audioUrl: string;
  duration: number; // in seconds
  category: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  playCount: number;
  rating: number;
  reviewCount: number;
}

export interface RadioSection {
  id: string;
  title: string;
  episodes: RadioEpisode[];
}

// Placeholder audio URLs
const AUDIO_URLS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
];

const generateRadioEpisodes = (): RadioSection[] => {
  const sections: RadioSection[] = [
    {
      id: 'thoi-su-30p',
      title: 'Thời Sự 30P',
      episodes: [
        {
          id: 'ts-001',
          title: 'TP.HCM đẩy mạnh phát triển hạ tầng giao thông công cộng năm 2026',
          subtitle: 'Thời sự 30 phút trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio1/340/200',
          audioUrl: AUDIO_URLS[0],
          duration: 1800, // 30 minutes
          category: 'Thời Sự',
          author: 'Minh Tuấn',
          authorAvatar: 'MT',
          publishDate: 'Thứ Năm, 28/05/2026, 17:30 (GMT+7)',
          playCount: 15420,
          rating: 4.5,
          reviewCount: 159,
        },
        {
          id: 'ts-002',
          title: 'Chương trình nhà ở xã hội hỗ trợ 30.000 hộ gia đình',
          subtitle: 'Thời sự 30 phút trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio2/340/200',
          audioUrl: AUDIO_URLS[1],
          duration: 1800,
          category: 'Thời Sự',
          author: 'Thanh Hà',
          authorAvatar: 'TH',
          publishDate: 'Thứ Tư, 27/05/2026, 17:30 (GMT+7)',
          playCount: 12350,
          rating: 4.7,
          reviewCount: 142,
        },
        {
          id: 'ts-003',
          title: 'Kinh tế số TP.HCM đạt tăng trưởng 12% quý 1',
          subtitle: 'Thời sự 30 phút trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio3/340/200',
          audioUrl: AUDIO_URLS[2],
          duration: 1800,
          category: 'Thời Sự',
          author: 'Hồng Nhung',
          authorAvatar: 'HN',
          publishDate: 'Thứ Ba, 26/05/2026, 17:30 (GMT+7)',
          playCount: 9870,
          rating: 4.3,
          reviewCount: 98,
        },
        {
          id: 'ts-004',
          title: 'Metro số 1 chính thức vận chuyển hành khách từ tháng 6',
          subtitle: 'Thời sự 30 phút trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio4/340/200',
          audioUrl: AUDIO_URLS[3],
          duration: 1800,
          category: 'Thời Sự',
          author: 'Văn Đức',
          authorAvatar: 'VD',
          publishDate: 'Thứ Hai, 25/05/2026, 17:30 (GMT+7)',
          playCount: 7650,
          rating: 4.6,
          reviewCount: 87,
        },
      ],
    },
    {
      id: 'tin-tict-buoi-sang',
      title: 'Tin Tức Buổi Sáng',
      episodes: [
        {
          id: 'tbs-001',
          title: 'Giá vàng hôm nay: SJC tăng 200.000 đồng/lượng',
          subtitle: 'Tin tức buổi sáng trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio5/340/200',
          audioUrl: AUDIO_URLS[4],
          duration: 1200, // 20 minutes
          category: 'Tin Tức',
          author: 'Mai Linh',
          authorAvatar: 'ML',
          publishDate: 'Thứ Năm, 28/05/2026, 07:00 (GMT+7)',
          playCount: 8920,
          rating: 4.4,
          reviewCount: 76,
        },
        {
          id: 'tbs-002',
          title: 'Thời tiết TP.HCM: Nắng nóng kéo dài đến cuối tuần',
          subtitle: 'Tin tức buổi sáng trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio6/340/200',
          audioUrl: AUDIO_URLS[5],
          duration: 1200,
          category: 'Tin Tức',
          author: 'Ngọc Ánh',
          authorAvatar: 'NA',
          publishDate: 'Thứ Tư, 27/05/2026, 07:00 (GMT+7)',
          playCount: 6780,
          rating: 4.2,
          reviewCount: 65,
        },
        {
          id: 'tbs-003',
          title: 'Giá thực phẩm ổn định, rau củ tăng nhẹ 5%',
          subtitle: 'Tin tức buổi sáng trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio7/340/200',
          audioUrl: AUDIO_URLS[0],
          duration: 1200,
          category: 'Tin Tức',
          author: 'Thanh Bình',
          authorAvatar: 'TB',
          publishDate: 'Thứ Ba, 26/05/2026, 07:00 (GMT+7)',
          playCount: 5430,
          rating: 4.1,
          reviewCount: 54,
        },
        {
          id: 'tbs-004',
          title: 'Tỷ giá USD/VND ổn định quanh mức 24.500',
          subtitle: 'Tin tức buổi sáng trực tiếp',
          thumbnail: 'https://picsum.photos/seed/radio8/340/200',
          audioUrl: AUDIO_URLS[1],
          duration: 1200,
          category: 'Tin Tức',
          author: 'Yến Nhi',
          authorAvatar: 'YN',
          publishDate: 'Thứ Hai, 25/05/2026, 07:00 (GMT+7)',
          playCount: 4120,
          rating: 4.0,
          reviewCount: 43,
        },
      ],
    },
    {
      id: 'am-nhac-giai-tri',
      title: 'Âm Nhạc & Giải Trí',
      episodes: [
        {
          id: 'an-001',
          title: 'Top 10 bài hát Việt được yêu thích nhất tuần qua',
          subtitle: 'Âm nhạc & Giải trí周末',
          thumbnail: 'https://picsum.photos/seed/radio9/340/200',
          audioUrl: AUDIO_URLS[2],
          duration: 2400, // 40 minutes
          category: 'Giải Trí',
          author: 'Kim Chi',
          authorAvatar: 'KC',
          publishDate: 'Thứ Năm, 28/05/2026, 20:00 (GMT+7)',
          playCount: 23450,
          rating: 4.8,
          reviewCount: 234,
        },
        {
          id: 'an-002',
          title: 'Interview: Ca sĩ Hoàng Yến chia sẻ về MV mới',
          subtitle: 'Âm nhạc & Giải trí周末',
          thumbnail: 'https://picsum.photos/seed/radio10/340/200',
          audioUrl: AUDIO_URLS[3],
          duration: 2400,
          category: 'Giải Trí',
          author: 'Thảo Vy',
          authorAvatar: 'TV',
          publishDate: 'Thứ Tư, 27/05/2026, 20:00 (GMT+7)',
          playCount: 18920,
          rating: 4.9,
          reviewCount: 198,
        },
        {
          id: 'an-003',
          title: 'Hòa nhạc giao hưởng mùa hè: Bản giao hưởng mùa xuân',
          subtitle: 'Âm nhạc & Giải trí周末',
          thumbnail: 'https://picsum.photos/seed/radio11/340/200',
          audioUrl: AUDIO_URLS[4],
          duration: 2400,
          category: 'Giải Trí',
          author: 'Đức Thịnh',
          authorAvatar: 'ĐT',
          publishDate: 'Thứ Ba, 26/05/2026, 20:00 (GMT+7)',
          playCount: 14560,
          rating: 4.6,
          reviewCount: 156,
        },
        {
          id: 'an-004',
          title: 'Nhạc phim Việt: Những bản tình ca hay nhất 2026',
          subtitle: 'Âm nhạc & Giải trí周末',
          thumbnail: 'https://picsum.photos/seed/radio12/340/200',
          audioUrl: AUDIO_URLS[5],
          duration: 2400,
          category: 'Giải Trí',
          author: 'Ngọc Lam',
          authorAvatar: 'NL',
          publishDate: 'Thứ Hai, 25/05/2026, 20:00 (GMT+7)',
          playCount: 11230,
          rating: 4.5,
          reviewCount: 127,
        },
      ],
    },
    {
      id: 'goc-nhin-chuyen-gia',
      title: 'Góc Nhìn Chuyên Gia',
      episodes: [
        {
          id: 'gn-001',
          title: 'TS. Nguyễn Văn A: Phân tích xu hướng bất động sản 2026',
          subtitle: 'Góc nhìn chuyên gia',
          thumbnail: 'https://picsum.photos/seed/radio13/340/200',
          audioUrl: AUDIO_URLS[0],
          duration: 2700, // 45 minutes
          category: 'Góc Nhìn',
          author: 'Phan Hùng',
          authorAvatar: 'PH',
          publishDate: 'Thứ Năm, 28/05/2026, 19:00 (GMT+7)',
          playCount: 16780,
          rating: 4.7,
          reviewCount: 189,
        },
        {
          id: 'gn-002',
          title: 'Giáo sư Lê Thị B: Tương lai của kinh tế số tại Việt Nam',
          subtitle: 'Góc nhìn chuyên gia',
          thumbnail: 'https://picsum.photos/seed/radio14/340/200',
          audioUrl: AUDIO_URLS[1],
          duration: 2700,
          category: 'Góc Nhìn',
          author: 'Thùy Dương',
          authorAvatar: 'TD',
          publishDate: 'Thứ Tư, 27/05/2026, 19:00 (GMT+7)',
          playCount: 13450,
          rating: 4.6,
          reviewCount: 145,
        },
        {
          id: 'gn-003',
          title: 'KTS. Trần Văn C: Quy hoạch đô thị và bảo tồn di sản',
          subtitle: 'Góc nhìn chuyên gia',
          thumbnail: 'https://picsum.photos/seed/radio15/340/200',
          audioUrl: AUDIO_URLS[2],
          duration: 2700,
          category: 'Góc Nhìn',
          author: 'Minh Quân',
          authorAvatar: 'MQ',
          publishDate: 'Thứ Ba, 26/05/2026, 19:00 (GMT+7)',
          playCount: 9870,
          rating: 4.4,
          reviewCount: 98,
        },
        {
          id: 'gn-004',
          title: 'TS. Hoàng Thị D: Cải cách giáo dục phổ thông',
          subtitle: 'Góc nhìn chuyên gia',
          thumbnail: 'https://picsum.photos/seed/radio16/340/200',
          audioUrl: AUDIO_URLS[3],
          duration: 2700,
          category: 'Góc Nhìn',
          author: 'Kiều Oanh',
          authorAvatar: 'KO',
          publishDate: 'Thứ Hai, 25/05/2026, 19:00 (GMT+7)',
          playCount: 7650,
          rating: 4.3,
          reviewCount: 82,
        },
      ],
    },
  ];

  return sections;
};

export const radioSections = generateRadioEpisodes();

export const getAllEpisodes = (): RadioEpisode[] => {
  const all: RadioEpisode[] = [];
  radioSections.forEach(section => {
    all.push(...section.episodes);
  });
  return all;
};

export const getEpisodeById = (id: string): RadioEpisode | undefined => {
  return getAllEpisodes().find(ep => ep.id === id);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatPlayCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

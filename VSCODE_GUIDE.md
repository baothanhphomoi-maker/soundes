# Hướng dẫn thêm Bài viết và Audio qua Visual Studio Code

## Cấu trúc dự án

```
project/
├── src/
│   ├── data/
│   │   ├── newsData.ts         # Dữ liệu categories, breaking news
│   │   ├── radioEpisodes.ts    # Danh sách radio episodes
│   │   └── radioData.ts        # Metadata radio
│   ├── pages/
│   │   ├── HomePage.tsx        # Trang chủ
│   │   ├── CategoryPage.tsx    # Trang chuyên mục
│   │   └── RadioPage.tsx       # Trang radio
│   └── App.tsx                 # Routes
├── supabase/
│   └── migrations/             # Database migrations
└── .env                        # Supabase credentials
```

---

## PHẦN 1: THÊM BÀI VIẾT MỚI

### Cách 1: Thêm qua Database (Khuyên dùng)

#### Bước 1: Mở Supabase Dashboard

1. Mở browser, truy cập: https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào mục **Table Editor** → **articles**

#### Bước 2: Insert bài viết mới

Click nút **Insert** → **Insert row**, điền các trường:

```sql
-- Các trường cần điền:
title: "Tiêu đề bài viết của bạn"
excerpt: "Mô tả ngắn gọn về bài viết..."
content: "Nội dung đầy đủ của bài viết (có thể để null)"
category: "Thành phố hôm nay"
category_id: "thanh-pho"
category_slug: "/thanh-pho"
image: "https://images.pexels.com/photos/XXXXX/pexels-photo.jpeg"
author: "Tên Tác Giả"
is_breaking: false
tags: ["tag1", "tag2", "tag3"]
```

#### Bước 3: Lấy ảnh từ Pexels

1. Truy cập: https://www.pexels.com
2. Tìm kiếm ảnh phù hợp (v.d. "ho chi minh city", "vietnam news")
3. Chọn ảnh → Click **Download** → Copy URL ảnh
4. Hoặc dùng format: `https://images.pexels.com/photos/[ID]/pexels-photo.jpeg`

**Ví dụ URL ảnh đẹp:**
```
https://images.pexels.com/photos/1100962/pexels-photo-1100962.jpeg
https://images.pexels.com/photos/1478685/pexels-photo-1478685.jpeg
https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg
```

#### Bước 4: Categories có sẵn

| category | category_id | category_slug |
|----------|-------------|---------------|
| Thành phố hôm nay | thanh-pho | /thanh-pho |
| 168 Phường-Xã | 168-phuong-xa | /168-phuong-xa |
| Đời sống | doi-song | /doi-song |
| Góc nhìn | goc-nhin | /goc-nhin |
| Giải trí | giai-tri | /giai-tri |

**Bài viết sẽ tự động:**
- Hiển thị trên trang chủ
- Hiển thị trong chuyên mục tương ứng
- Đếm lượt xem khi người dùng click

---

## PHẦN 2: THÊM AUDIO EPISODE MỚI

### Bước 1: Chuẩn bị file audio

**Option 1: Upload lên Supabase Storage**

1. Vào Supabase Dashboard → **Storage**
2. Tạo bucket: Click **Create a new bucket**
   - Name: `radio-audio`
   - Public bucket: ✅ Enable
3. Upload file audio (.mp3, .m4a)
4. Copy **Public URL**: `https://kajhhletefflhzcjxhzo.supabase.co/storage/v1/object/public/radio-audio/[filename.mp3]`

**Option 2: Dùng CDN/Hosting khác**

- Upload lên Cloudinary, AWS S3, Google Cloud Storage
- Hoặc dùng link từ server của bạn

### Bước 2: Thêm episode vào database

Mở Supabase Dashboard → **Table Editor** → **radio_episodes** → **Insert row**:

```sql
id: "ep-009"                    -- ID định dạng (ep-XXX)
title: "Tiêu đề episode"        -- Tên episode
description: "Mô tả chi tiết..." -- Nội dung
host_name: "Tên Host"           -- Người dẫn chương trình
duration: 1800                  -- Thời lượng (giây), 1800 = 30 phút
listen_count: 0                 -- Mặc định 0, sẽ tự tăng
```

### Bước 3: Cập nhật code radioEpisodes.ts

**Mở file:** `src/data/radioEpisodes.ts`

**Thêm object mới vào mảng `radioEpisodes`:**

```typescript
{
  id: 'ep-009',  // PHẢI KHỚP VỚI ID trong database
  title: 'Your Episode Title',
  description: 'Mô tả chi tiết về episode...',
  thumbnail: 'https://images.pexels.com/photos/XXXXX/pexels-photo.jpeg', // Ảnh vuông 800x800
  audioUrl: 'https://kajhhletefflhzcjxhzo.supabase.co/storage/v1/object/public/radio-audio/your-audio.mp3',
  duration: 1800, // GIÂY - phải khớp với database
  category: 'Thời Sự',
  categoryColor: '#1E3A8A',
  host: {
    name: 'Tên Host',
    avatar: 'TH', // 2 chữ cái đầu tên
  },
  publishDate: '2026-05-30',
  publishTime: '10:00',
  tags: ['News', 'TP.HCM', 'Vietnam'],
}
```

### Bước 4: Cấu trúc file radioEpisodes.ts mẫu

```typescript
// src/data/radioEpisodes.ts

export interface RadioEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audioUrl: string;
  duration: number;
  category: string;
  categoryColor: string;
  host: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  publishTime: string;
  tags: string[];
}

export const radioEpisodes: RadioEpisode[] = [
  {
    id: 'ep-001',
    title: 'Bản Tin Sáng: TP.HCM Phát Triển Hạ Tầng Metro Số 1',
    description: 'Phân tích chi tiết về dự án Metro số 1...',
    thumbnail: 'https://images.pexels.com/photos/1100962/pexels-photo-1100962.jpeg',
    audioUrl: 'https://your-audio-url.com/audio1.mp3',
    duration: 1800,
    category: 'Thời Sự',
    categoryColor: '#1E3A8A',
    host: {
      name: 'Nguyễn Văn A',
      avatar: 'NV',
    },
    publishDate: '2026-05-30',
    publishTime: '07:00',
    tags: ['Metro', 'Giao thông', 'TP.HCM'],
  },
  // THÊM EPISODE MỚI TẠI ĐÂY
  {
    id: 'ep-009',
    title: 'Episode mới của bạn',
    description: 'Nội dung...',
    thumbnail: 'https://images.pexels.com/photos/1478685/pexels-photo-1478685.jpeg',
    audioUrl: 'https://kajhhletefflhzcjxhzo.supabase.co/storage/v1/object/public/radio-audio/new-audio.mp3',
    duration: 1800,
    category: 'Thời Sự',
    categoryColor: '#1E3A8A',
    host: {
      name: 'Admin',
      avatar: 'AD',
    },
    publishDate: '2026-05-30',
    publishTime: '10:00',
    tags: ['News'],
  },
];
```

---

## PHẦN 3: TÙY CHỈNH DANH MỤC & TAGS

### Thêm Category mới

**Bước 1:** Thêm route trong `src/App.tsx`:

```tsx
<Route path="/chuyen-muc-moi" element={<CategoryPage categorySlug="/chuyen-muc-moi" />} />
```

**Bước 2:** Cập nhật `src/data/newsData.ts`:

```typescript
export const categories = [
  // ...categories cũ
  {
    id: 'chuyen-muc-moi',
    name: 'Chuyên Mục Mới',
    slug: '/chuyen-muc-moi',
  },
];
```

**Bước 3:** Thêm bài viết với category mới trong database:

```sql
category: "Chuyên Mục Mới"
category_id: "chuyen-muc-moi"
category_slug: "/chuyen-muc-moi"
```

---

## PHẦN 4: WORKFLOW HOÀN CHỈNH

### Workflow thêm BÀI VIẾT mới:

1. ✅ Mở Supabase Dashboard
2. ✅ Table Editor → articles → Insert row
3. ✅ Điền: title, excerpt, category, image (URL Pexels)
4. ✅ Save
5. ✅ **Tự động:** Hiển thị trên website, đếm lượt xem

### Workflow thêm AUDIO mới:

1. ✅ Chuẩn bị file audio (.mp3)
2. ✅ Upload lên Supabase Storage → Copy public URL
3. ✅ Table Editor → radio_episodes → Insert row
   - Điền: id (ep-009), title, description, host_name, duration
4. ✅ Mở `src/data/radioEpisodes.ts` trong VS Code
5. ✅ Thêm object mới vào mảng `radioEpisodes`
   - Copy ID từ database
   - Paste audio URL từ Storage
   - Thêm thumbnail (Pexels)
6. ✅ Save file
7. ✅ `npm run dev` để xem kết quả

---

## PHẦN 5: MẸO & BEST PRACTICES

### 1. Tìm ảnh đẹp trên Pexels

```
Keywords gợi ý:
- "ho chi minh city"
- "vietnam street"
- "vietnam news"
- "asia city"
- "urban life"
- "technology"
- "business meeting"
- "people working"
```

### 2. Upload audio lên Supabase Storage

**Chi tiết:**
```
1. Vào Storage → Create bucket "radio-audio"
2. Enable "Public bucket"
3. Upload file .mp3 (không quá 50MB)
4. Click vào file → Copy URL
5. Dùng URL trong radioEpisodes.ts
```

### 3. Kiểm tra lỗi

**Nếu audio không chạy:**
- Kiểm tra URL audio có đúng không
- Mở URL trong browser → xem có tải được không
- Kiểm tra file format (.mp3, .m4a được hỗ trợ)

**Nếu bài viết không hiện:**
- Kiểm tra `category_slug` có đúng không
- Kiểm tra RLS policies trong Supabase Dashboard
- Xem console log (F12) trong browser

### 4. Format thời lượng

```javascript
// Chuyển đổi phút sang giây
const minutes = 30;
const duration = minutes * 60; // = 1800 giây

// Ví dụ:
// 15 phút = 900 giây
// 30 phút = 1800 giây
// 45 phút = 2700 giây
// 60 phút = 3600 giây
```

---

## PHẦN 6: VÍ DỤ THỰC TẾ

### Ví dụ 1: Thêm bài viết về "Metro TP.HCM"

```sql
-- Insert vào Supabase Table Editor
title: "Metro Số 1: Dự Án Vịnh Biển Sắp Hoàn Thành"
excerpt: "Sau nhiều năm chậm trễ, tuyến Metro số 1 Bến Thành - Suối Tiên đang逼近ngày hoàn thành..."
category: "Thành phố hôm nay"
category_id: "thanh-pho"
category_slug: "/thanh-pho"
image: "https://images.pexels.com/photos/1100962/pexels-photo-1100962.jpeg"
author: "Minh Tuấn"
tags: ["Metro", "Giao thông", "TP.HCM"]
```

### Ví dụ 2: Thêm audio episode "Phỏng vấn Chuyên gia"

**Database:**
```sql
id: "ep-010"
title: "Góc Nhìn Chuyên Gia: Tương Lai Smart City Việt Nam"
description: "Phỏng vấn TS. Nguyễn Văn B về tầm nhìn thành phố thông minh..."
host_name: "Lan Anh"
duration: 2400  -- 40 phút
```

**Code (radioEpisodes.ts):**
```typescript
{
  id: 'ep-010',
  title: 'Góc Nhìn Chuyên Gia: Tương Lai Smart City Việt Nam',
  description: 'Phỏng vấn TS. Nguyễn Văn B về tầm nhìn thành phố thông minh...',
  thumbnail: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg',
  audioUrl: 'https://kajhhletefflhzcjxhzo.supabase.co/storage/v1/object/public/radio-audio/interview-smart-city.mp3',
  duration: 2400,
  category: 'Chuyên Gia',
  categoryColor: '#047857',
  host: {
    name: 'Lan Anh',
    avatar: 'LA',
  },
  publishDate: '2026-05-30',
  publishTime: '14:00',
  tags: ['Smart City', 'Technology', 'Vietnam'],
}
```

---

## PHẦN 7: TÓM TẮT NHANH

| Nội dung | Nơi chỉnh sửa | Lưu ý |
|----------|--------------|-------|
| **Bài viết** | Supabase Dashboard → articles | Tự động hiển thị |
| **Audio metadata** | Supabase Dashboard → radio_episodes | Chỉ title, desc, host |
| **Audio file & info đầy đủ** | VS Code → radioEpisodes.ts | Cần code + database |
| **Ảnh thumbnail** | Pexels.com → Copy URL | Dùng URL https://images.pexels.com/... |
| **File audio** | Supabase Storage | Upload .mp3, copy URL |

---

## SUPPORT

**Gặp vấn đề?**
1. Kiểm tra file `.env` có đúng Supabase credentials
2. Chạy `npm run dev` để xem lỗi trong terminal
3. Mở browser console (F12) để xem lỗi JavaScript
4. Kiểm tra RLS policies trong Supabase Dashboard

**Cần làm mới database?**
```bash
# Reset data (CẨN THẬN - sẽ xóa hết data)
# Vào Supabase SQL Editor:
TRUNCATE articles CASCADE;
TRUNCATE radio_episodes CASCADE;
```

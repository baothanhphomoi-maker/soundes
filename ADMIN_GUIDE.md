# Hướng dẫn sử dụng Admin Dashboard

## Bước 1: Tạo tài khoản Admin

1. Truy cập **Supabase Dashboard**: https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào mục **Authentication** → **Users**
4. Click **Add user** → **Create new user**
5. Nhập:
   - Email: `admin@tintphcm.vn` (hoặc email bạn muốn)
   - Password: Mật khẩu mạnh
   - ✅ **Auto Confirm User** (để không cần verify email)
6. Click **Create user**

## Bước 2: Đăng nhập vào Admin

1. Truy cập: `http://localhost:5173/admin/login`
2. Nhập email và password đã tạo ở Bước 1
3. Click **Đăng nhập**

## Bước 3: Quản lý Bài viết

### Thêm bài viết mới

1. Click tab **Bài viết**
2. Click nút **Thêm bài viết mới** (màu xanh lá)
3. Điền thông tin:
   - **Tiêu đề**: Tiêu đề bài viết
   - **Chuyên mục**: Chọn danh mục phù hợp
   - **Tóm tắt**: Mô tả ngắn gọn
   - **Link ảnh**: URL hình ảnh (có thể dùng https://picsum.photos/seed/xxx/800/450)
   - **Tác giả**: Tên tác giả
4. Click **Lưu**

### Sửa bài viết

1. Click icon **Edit** (bút xanh) ở dòng bài viết
2. Chỉnh sửa thông tin trong form
3. Click **Lưu**

### Xóa bài viết

1. Click icon **Trash** (thùng rác đỏ) ở dòng bài viết
2. Xác nhận xóa

## Bước 4: Quản lý Radio Episodes

### Thêm Episode mới

1. Click tab **Radio Episodes**
2. Click nút **Thêm episode mới**
3. Điền thông tin:
   - **ID Episode**: Mã định danh (v.d. `ep-009`)
   - **Tiêu đề**: Tên episode
   - **Mô tả**: Nội dung chi tiết
   - **Tên Host**: Người dẫn chương trình
   - **Thời lượng**: Số giây (1800 = 30 phút)
4. Click **Lưu**

5. **QUAN TRỌNG**: Sau khi lưu, bạn cần cập nhật file `src/data/radioEpisodes.ts`:
   - Thêm object mới vào mảng `radioEpisodes`
   - Copy ID episode đã tạo ở bước trên
   - Thêm các thông tin bổ sung:
     - `audioUrl`: Link file audio thực tế
     - `thumbnail`: Link hình ảnh
     - `category`: Thể loại (Thời Sự, Kinh Tế, Văn Hóa...)
     - `categoryColor`: Màu sắc (#1E3A8A, #047857...)
     - `host.name` và `host.avatar`
     - `publishDate` và `publishTime`
     - `tags`: Mảng các tag liên quan

### Ví dụ thêm episode vào code:

```typescript
{
  id: 'ep-009',
  title: 'Episode mới của bạn',
  description: 'Mô tả đã điền trong form',
  thumbnail: 'https://picsum.photos/seed/new-ep/800/800',
  audioUrl: 'https://your-audio-url.com/audio.mp3',
  duration: 1800,
  category: 'Thời Sự',
  categoryColor: '#1E3A8A',
  host: {
    name: 'Tên Host',
    avatar: 'TH',
  },
  publishDate: '2026-05-30',
  publishTime: '10:00',
  tags: ['Tag1', 'Tag2'],
}
```

## Bước 5: Upload Audio Files

### Tùy chọn 1: Sử dụng Supabase Storage

1. Vào Supabase Dashboard → **Storage**
2. Tạo bucket mới (v.d. `radio-audio`)
3. Upload file audio (.mp3)
4. Copy **Public URL**
5. Sử dụng URL này cho `audioUrl` trong code

### Tùy chọn 2: Sử dụng CDN/Hosting khác

- Upload lên: Cloudinary, AWS S3, Google Cloud Storage
- Hoặc sử dụng link trực tiếp từ server của bạn

## Lưu ý quan trọng

1. **Bảo mật**:
   - Chỉ người có tài khoản Supabase Auth mới truy cập được Admin
   - Không chia sẻ tài khoản admin công khai

2. **Dữ liệu đồng bộ**:
   - Bài viết: Lưu trực tiếp vào database, hiển thị ngay lập tức
   - Radio: Lưu vào database NHƯNG cần cập nhật code để có đủ metadata

3. **Lượt xem/nghe**:
   - Tự động đếm khi người dùng click
   - Không bị reset khi reload
   - Hiển thị real-time trong Admin Dashboard

## Truy cập nhanh

- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin`
- **Quên mật khẩu**: Tạo lại user mới trong Supabase Dashboard

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra browser console (F12)
2. Kiểm tra Supabase logs
3. Đảm bảo RLS policies đã được enable

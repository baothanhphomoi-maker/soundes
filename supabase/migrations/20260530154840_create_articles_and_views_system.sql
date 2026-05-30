/*
  # Tạo hệ thống bài viết và thống kê lượt xem thực tế

  1. Bảng articles
    - Lưu trữ thông tin bài viết với title, content, category, image
    - created_at: thời gian tạo bài viết (để sắp xếp)
    - views_count: số lượt xem thực tế (mặc định 0)

  2. Bảng article_views
    - Ghi nhận từng lượt xem cụ thể
    - Liên kết với bài viết qua article_id
    - viewed_at: thời gian xem
    - ip_address: để tránh spam (optional)
    - user_agent: thông tin trình duyệt (optional)

  3. Security (RLS)
    - Articles: công khai đọc
    - Article views: công khai ghi (để ghi nhận lượt xem)

  4. Index
    - Index trên created_at để sắp xếp nhanh
    - Index trên article_id để truy vấn lượt xem nhanh

  5. Trigger
    - Tự động cập nhật views_count trong bảng articles khi có view mới
*/

-- Tạo bảng articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL,
  category_id TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  image TEXT,
  author TEXT DEFAULT 'Admin',
  is_breaking BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  views_count BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Tạo bảng article_views để tracking từng lượt xem
CREATE TABLE IF NOT EXISTS article_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies cho articles
CREATE POLICY "Public can read articles"
  ON articles FOR SELECT
  TO public
  USING (true);

-- RLS Policies cho article_views - cho phép INSERT
CREATE POLICY "Public can insert views"
  ON article_views FOR INSERT
  TO public
  WITH CHECK (true);

-- Tạo index để tối ưu query
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category_slug ON articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_viewed_at ON article_views(viewed_at DESC);

-- Trigger function để tự động cập nhật views_count
CREATE OR REPLACE FUNCTION update_article_views_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE articles
  SET views_count = views_count + 1,
      updated_at = NOW()
  WHERE id = NEW.article_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo trigger
CREATE TRIGGER trigger_update_views_count
  AFTER INSERT ON article_views
  FOR EACH ROW
  EXECUTE FUNCTION update_article_views_count();

-- Trigger để tự động updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert dữ liệu mẫu
INSERT INTO articles (title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at)
VALUES
  -- Thành phố hôm nay
  ('TP.HCM khởi công dự án Metro số 2 kết nối Quận 1 và Thủ Đức', 'Dự án Metro số 2 với tổng vốn đầu tư 47.000 tỷ đồng chính thức khởi công, dự kiến hoàn thành vào năm 2030.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/metro-2/800/450', 'Minh Tuấn', true, ARRAY['Metro', 'Giao thông', 'Quận 1', 'Thủ Đức'], 0, NOW() - INTERVAL '15 minutes'),
  ('Hệ thống xe buýt điện đầu tiên hoạt động thử nghiệm tại TP.HCM', 'Dự án xe buýt điện với 50 chuyến mỗi ngày, phục vụ 10 tuyến đường chính nội thành.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/bus-electric/800/450', 'Hoàng Nam', true, ARRAY['Xe buýt', 'Điện', 'Giao thông'], 0, NOW() - INTERVAL '20 minutes'),
  ('Chợ Bến Thành mở cửa 24/7 phục vụ du khách quốc tế', 'Chương trình thí điểm mở rộng giờ hoạt động nhằm thúc đẩy du lịch đêm.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/ben-thanh/800/450', 'Lan Hương', false, ARRAY['Chợ Bến Thành', 'Du lịch', '24/7'], 0, NOW() - INTERVAL '45 minutes'),
  ('Hồ Con Rùa cải tạo thành không gian văn hóa hiện đại', 'Dự án 200 tỷ đồng biến khu vực trung tâm thành điểm đến nghệ thuật công cộng.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/ho-con-rua/800/450', 'Minh Đức', false, ARRAY['Hồ Con Rùa', 'Cải tạo', 'Văn hóa'], 0, NOW() - INTERVAL '1 hour'),
  
  -- 168 Phường-Xã
  ('Phường Bến Nghé dẫn đầu phong trào Ngõ xóm sạch đẹp', '100% các ngõ hẻm được lát gạch, trồng cây xanh, góp phần thay đổi diện mạo đô thị.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/ben-nghe/800/450', 'Thị Hạnh', true, ARRAY['Phường', 'Vệ sinh', 'Đô thị'], 0, NOW() - INTERVAL '30 minutes'),
  ('Xã Phú Hòa Đông lập kỷ lục về năng suất lúa mùa xuân', 'Năng suất đạt 8.2 tấn/ha, cao nhất từ trước đến nay nhờ áp dụng công nghệ viễn thám.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/phu-hoa/800/450', 'Ngọc Ánh', false, ARRAY['Nông nghiệp', 'Lúa', 'Kỷ lục'], 0, NOW() - INTERVAL '2 hours'),
  ('Phường Tân Phú mở khu vui chơi trẻ em miễn phí cuối tuần', 'Không gian 2.000m2 với nhiều trò chơi giáo dục thu hút 500 trẻ em tham gia mỗi ngày.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/tan-phu/800/450', 'Yến Nhi', false, ARRAY['Trẻ em', 'Vui chơi', 'Miễn phí'], 0, NOW() - INTERVAL '6 hours'),
  
  -- Đời sống
  ('Giá thực phẩm tăng 15% đầu tháng, người dân chủ động tích trữ', 'Giá rau củ, thịt gia tăng do thời tiết mưa kéo dài, Bộ Công Thương cam kết bình ổn giá.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/gia-thuc-pham/800/450', 'Thanh Trúc', true, ARRAY['Giá cả', 'Thực phẩm', 'Thị trường'], 0, NOW() - INTERVAL '20 minutes'),
  ('TP.HCM mở 20 điểm phát cơm miễn phí cho người nghèo dịp Tết', 'Chương trình phục vụ 10.000 suất ăn mỗi ngày từ ngày 20 đến 30 Tết Nguyên Đán.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/com-mien-phi/800/450', 'Hữu Nam', false, ARRAY['Từ thiện', 'Cơm miễn phí', 'Tết'], 0, NOW() - INTERVAL '1 hour'),
  ('Thành phố hỗ trợ 200.000 hộ gia đình vay vốn khởi nghiệp', 'Gói tín dụng 5.000 tỷ đồng với lãi suất ưu đãi 4%/năm, ưu tiên doanh nghiệp nhỏ và siêu nhỏ.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/vay-von/800/450', 'Diễm Hương', false, ARRAY['Vay vốn', 'Khởi nghiệp', 'Hỗ trợ'], 0, NOW() - INTERVAL '3 hours'),
  
  -- Góc nhìn
  ('TS. Nguyễn Văn A: Hệ thống giao thông công cộng cần tư duy mới', 'Chuyên gia giao thông kiến nghị phát triển mạng lưới xe buýt điện kết nối các tỉnh lân cận.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/giao-thong/800/450', 'Phan Hùng', true, ARRAY['Giao thông', 'Chuyên gia', 'Xe buýt điện'], 0, NOW() - INTERVAL '45 minutes'),
  ('Giáo sư Lê Thị B: Kinh tế số là cơ hội để Việt Nam bứt phá', 'Việt Nam cần đầu tư 50.000 tỷ đồng vào hạ tầng số trong 5 năm tới để bắt kịp khu vực.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/kinh-te-so/800/450', 'Thùy Dương', false, ARRAY['Kinh tế số', 'Chuyển đổi số', 'Đầu tư'], 0, NOW() - INTERVAL '2 hours'),
  
  -- Giải trí
  ('Able Tề Minh Quân bất ngờ công bố wedding song mới Sài Gòn', 'MV ghi hình tại 50 danh lam thắng cảnh, với kinh phí 3 tỷ đồng và dàn diễn viên 500 người.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/minh-quan/800/450', 'Kim Chi', true, ARRAY['Âm nhạc', 'Wedding song', 'Sài Gòn'], 0, NOW() - INTERVAL '10 minutes'),
  ('Nhóm nhảy Mây Lang Thang thắng giải nhất flashmob toàn quốc', 'Đội từ Quận 10 nhận giải thưởng 200 triệu đồng sau 3 tháng thi đấu.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/flashmob/800/450', 'Thảo Vy', false, ARRAY['Nhảy', 'Flashmob', 'Giải nhất'], 0, NOW() - INTERVAL '1 hour'),
  ('Sân khấu kịch Idecaf ra mắt vở Kể chuyện Sài Gòn cháy vé', 'Vở kịch tái hiện lịch sử 300 năm, mỗi suất diễn thu hút 800 khán giả trong 20 phút.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/kich-idecaf/800/450', 'Hoàng Yến', false, ARRAY['Kịch', 'Idecaf', 'Sài Gòn'], 0, NOW() - INTERVAL '3 hours'),
  ('Lễ hội ẩm thực đường phố thu hút 50.000 du khách cuối tuần', 'Hơn 150 gian hàng phục vụ đặc sản 3 miền, doanh thu 2 ngày đạt 5 tỷ đồng.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/am-thuc/800/450', 'Đức Thịnh', false, ARRAY['Ẩm thực', 'Lễ hội', 'Du lịch'], 0, NOW() - INTERVAL '5 hours');

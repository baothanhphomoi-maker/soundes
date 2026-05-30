/*
  # Seed Breaking News Articles - Real-time Updates

  1. Purpose
    - Add breaking news with timestamps from last 5 minutes to 1 hour
    - Test real-time sorting feature
*/

INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'KHẨN: TP.HCM công bố dự án đô thị thông minh 2026-2030', 'Dự án 10.000 tỷ đồng biến TP.HCM thành thành phố thông minh hàng đầu Đông Nam Á.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/breaking1/800/450', 'Minh Tuấn', true, ARRAY['Smart City', 'KHẨN'], 856, NOW() - INTERVAL '3 minutes'),
(gen_random_uuid(), 'Giao thông ùn tắc nghiêm trọng tại Nguyễn Văn Linh', 'Hàng nghìn xe mắc kẹt do sự cố kỹ thuật tại hầm Thủ Thiêm.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/breaking2/800/450', 'Thanh Hà', true, ARRAY['Giao thông', 'Ùn tắc'], 1243, NOW() - INTERVAL '8 minutes'),
(gen_random_uuid(), 'Mưa lớn bất thường gây ngập nhiều khu vực Quận 4', 'Mưa kéo dài 2 giờ gây ngập cục bộ nhiều tuyến đường.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/breaking3/800/450', 'Hoàng Nam', true, ARRAY['Thời tiết', 'Ngập lụt'], 978, NOW() - INTERVAL '12 minutes'),
(gen_random_uuid(), 'Tăng cường an ninh dịp Tết Nguyên Đán 2026', 'Công an TP.HCM bố trí 15.000 cán bộ chiến sĩ trực Tết.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/news1/800/450', 'Lan Hương', false, ARRAY['An ninh', 'Tết'], 654, NOW() - INTERVAL '18 minutes'),
(gen_random_uuid(), 'Khánh thành Trung tâm Y tế Quận 7 hiện đại', 'Trung tâm 500 giường bệnh với trang thiết bị tiên tiến.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/news2/800/450', 'Minh Đức', false, ARRAY['Y tế', 'Quận 7'], 432, NOW() - INTERVAL '25 minutes'),
(gen_random_uuid(), 'Phường Tân Phú A phát động phong trào Toàn dân xây dựng nông thôn mới', '100% hộ dân tham gia cải tạo vườn tược, đường xá.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/ward1/800/450', 'Thị Hạnh', false, ARRAY['Nông thôn mới', 'Tân Phú'], 567, NOW() - INTERVAL '35 minutes'),
(gen_random_uuid(), 'Giá vàng tăng vọt, vượt mốc 80 triệu đồng/lượng', 'Giá vàng SJC sáng nay đạt 80,5 triệu đồng/lượng mua vào.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/life1/800/450', 'Thanh Trúc', true, ARRAY['Giá vàng', 'Kinh tế'], 2345, NOW() - INTERVAL '40 minutes'),
(gen_random_uuid(), 'Tỷ phú Elon Musk phát biểu về Việt Nam tại hội nghị kinh tế', 'Tỷ phú công nghệ đánh giá cao tiềm năng kinh tế số Việt Nam.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/view1/800/450', 'Phan Hùng', true, ARRAY['Elon Musk', 'Công nghệ'], 3567, NOW() - INTERVAL '50 minutes');

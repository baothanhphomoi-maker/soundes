/*
  # Seed Sample Articles Data with gen_random_uuid()
  
  1. Purpose
    - Insert sample news articles using auto-generated UUIDs
    - Avoid manual UUID format issues
    
  2. Method
    - Use gen_random_uuid() for each INSERT
    - Wrap in CTEs for clarity
*/

-- Insert articles for "Thành phố hôm nay"
INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'TP.HCM khởi công dự án Metro số 2 kết nối Quận 1 và Thủ Đức', 'Dự án Metro số 2 với tổng vốn đầu tư 47.000 tỷ đồng chính thức khởi công, dự kiến hoàn thành vào năm 2030.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/1/800/450', 'Minh Tuấn', true, ARRAY['Metro', 'Giao thông', 'Quận 1', 'Thủ Đức'], 15420, NOW() - INTERVAL '15 minutes'),
(gen_random_uuid(), 'UBND TP.HCM công bố quy hoạch sân bay Tân Sơn Nhất mới đến năm 2050', 'Quy hoạch mới mở rộng diện tích lên 5.000 ha, nâng công suất phục vụ 50 triệu hành khách mỗi năm.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/2/800/450', 'Thanh Hà', true, ARRAY['Tân Sơn Nhất', 'Quy hoạch', 'Hàng không'], 8930, NOW() - INTERVAL '1 hour'),
(gen_random_uuid(), 'Chương trình Thành phố thông minh đạt 500.000 người tham gia', 'Ứng dụng công nghệ số giúp giảm 40% thủ tục hành chính và tiết kiệm 200 tỷ đồng mỗi năm.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/3/800/450', 'Hồng Nhung', false, ARRAY['Smart City', 'Công nghệ', 'Hành chính'], 6750, NOW() - INTERVAL '2 hours'),
(gen_random_uuid(), 'Bắt đầu thi công cầu Rạch Chiếc nối Quận 9 và TP. Thủ Đức', 'Cầu mới dài 1.2km với 6 làn xe, dự kiến hoàn thành trong 24 tháng với tổng vốn 800 tỷ đồng.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/4/800/450', 'Văn Đức', false, ARRAY['Cầu', 'Giao thông', 'Thủ Đức'], 5280, NOW() - INTERVAL '3 hours'),
(gen_random_uuid(), 'Hệ thống xe buýt điện đầu tiên hoạt động thử nghiệm tại TP.HCM', 'Dự án xe buýt điện với 50 chuyến mỗi ngày, phục vụ 10 tuyến đường chính nội thành.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/101/800/450', 'Hoàng Nam', true, ARRAY['Xe buýt', 'Điện', 'Giao thông'], 12350, NOW() - INTERVAL '20 minutes'),
(gen_random_uuid(), 'Chợ Bến Thành mở cửa 24/7 phục vụ du khách quốc tế', 'Chương trình thí điểm mở rộng giờ hoạt động nhằm thúc đẩy du lịch đêm.', 'Thành phố hôm nay', 'thanh-pho', '/thanh-pho', 'https://picsum.photos/seed/102/800/450', 'Lan Hương', false, ARRAY['Bến Thành', 'Du lịch', 'Thương mại'], 9820, NOW() - INTERVAL '45 minutes');

-- Insert articles for "168 Phường-Xã"
INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'Phường Bến Nghé dẫn đầu phong trào Ngõ xóm sạch đẹp', '100% các ngõ hẻm được lát gạch, trồng cây xanh, góp phần thay đổi diện mạo đô thị.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/6/800/450', 'Thị Hạnh', true, ARRAY['Bến Nghé', 'Vệ sinh', 'Đô thị'], 7890, NOW() - INTERVAL '30 minutes'),
(gen_random_uuid(), 'Xã Phú Hòa Đông lập kỷ lục về năng suất lúa mùa xuân', 'Năng suất đạt 8.2 tấn/ha, cao nhất từ trước đến nay nhờ áp dụng công nghệ viễn thám.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/7/800/450', 'Ngọc Ánh', false, ARRAY['Nông nghiệp', 'Lúa', 'Công nghệ'], 6540, NOW() - INTERVAL '2 hours'),
(gen_random_uuid(), 'Phường 12 quận Gò Vấp hoàn thành mô hình hẻm văn hóa thể thao', 'Hẻm 45/2 với 200m đường chạy bộ và khu tập dưỡng sinh phục vụ người cao tuổi.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/113/800/450', 'Kim Oanh', false, ARRAY['Gò Vấp', 'Thể thao', 'Cộng đồng'], 2180, NOW() - INTERVAL '9 hours'),
(gen_random_uuid(), 'Xã Bình Thạnh Đông tổ chức hội chợ OCOP đầu xuân', '50 gian hàng trưng bày đặc sản nông sản sạch thu hút 5.000 du khách tham quan.', '168 phường-xã', '168-phuong-xa', '/168-phuong-xa', 'https://picsum.photos/seed/114/800/450', 'Thành Trung', false, ARRAY['OCOP', 'Nông sản', 'Hội chợ'], 1950, NOW() - INTERVAL '11 hours');

-- Insert articles for "Đời sống"
INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'Giá thực phẩm tăng 15% đầu tháng, người dân chủ động tích trữ', 'Giá rau củ, thịt gia tăng do thời tiết mưa kéo dài, Bộ Công Thương cam kết bình ổn giá.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/11/800/450', 'Thanh Trúc', true, ARRAY['Giá cả', 'Thực phẩm', 'Kinh tế'], 12340, NOW() - INTERVAL '20 minutes'),
(gen_random_uuid(), 'TP.HCM mở 20 điểm phát cơm miễn phí cho người nghèo dịp Tết', 'Chương trình phục vụ 10.000 suất ăn mỗi ngày từ ngày 20 đến 30 Tết Nguyên Đán.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/12/800/450', 'Hữu Nam', false, ARRAY['Từ thiện', 'Cơm miễn phí', 'Tết'], 9870, NOW() - INTERVAL '1 hour'),
(gen_random_uuid(), 'Chương trình Mùa Hè Xanh thu hút 15.000 tình nguyện viên', 'Sinh viên từ 50 trường đại học tham gia tình nguyện tại 168 phường xã.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/120/800/450', 'Minh Khuê', false, ARRAY['Mùa Hè Xanh', 'Tình nguyện', 'Sinh viên'], 5420, NOW() - INTERVAL '9 hours'),
(gen_random_uuid(), 'Bảo hiểm y tế miễn phí cho 500.000 trẻ em nghèo', 'Chương trình từ nguồn ngân sách thành phố bảo vệ quyền lợi sức khỏe trẻ em.', 'Đời sống', 'doi-song', '/doi-song', 'https://picsum.photos/seed/121/800/450', 'Thanh Bình', false, ARRAY['Bảo hiểm', 'Y tế', 'Trẻ em'], 4870, NOW() - INTERVAL '11 hours');

-- Insert articles for "Góc nhìn"
INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'TS. Nguyễn Văn A: Hệ thống giao thông công cộng cần tư duy mới', 'Chuyên gia giao thông kiến nghị phát triển mạng lưới xe buýt điện kết nối các tỉnh lân cận.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/16/800/450', 'Phan Hùng', true, ARRAY['Giao thông', 'Chuyên gia', 'Đô thị'], 11230, NOW() - INTERVAL '45 minutes'),
(gen_random_uuid(), 'Giáo sư Lê Thị B: Kinh tế số là cơ hội để Việt Nam bứt phá', 'Việt Nam cần đầu tư 50.000 tỷ đồng vào hạ tầng số trong 5 năm tới để bắt kịp khu vực.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/17/800/450', 'Thùy Dương', false, ARRAY['Kinh tế số', 'Chuyển đổi', 'Đầu tư'], 8760, NOW() - INTERVAL '2 hours'),
(gen_random_uuid(), 'PGS.TS. Phạm Văn F: Du lịch thông minh phải xuất phát từ trải nghiệm khách hàng', 'Chuyên gia du lịch phân tích về xu hướng chuyển đổi số trong ngành du lịch.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/127/800/450', 'Ngọc Diệp', false, ARRAY['Du lịch', 'Smart City', 'Chuyển đổi số'], 4320, NOW() - INTERVAL '10 hours'),
(gen_random_uuid(), 'ThS. Ngô Thị G: Phát triển nông nghiệp đô thị là xu hướng tất yếu', 'Chuyên gia nông nghiệp đề xuất mô hình canh tác hữu cơ trong không gian đô thị.', 'Góc nhìn', 'goc-nhin', '/goc-nhin', 'https://picsum.photos/seed/128/800/450', 'Việt Hà', false, ARRAY['Nông nghiệp', 'Đô thị', 'Hữu cơ'], 3780, NOW() - INTERVAL '12 hours');

-- Insert articles for "Giải trí"
INSERT INTO articles (id, title, excerpt, category, category_id, category_slug, image, author, is_breaking, tags, views_count, created_at) VALUES
(gen_random_uuid(), 'Able Tề Minh Quân bất ngờ công bố wedding song mới Sài Gòn', 'MV ghi hình tại 50 danh lam thắng cảnh, với kinh phí 3 tỷ đồng và dàn diễn viên 500 người.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/21/800/450', 'Kim Chi', true, ARRAY['Âm nhạc', 'MV', 'Celebrity'], 18900, NOW() - INTERVAL '10 minutes'),
(gen_random_uuid(), 'Nhóm nhảy Mây Lang Thang thắng giải nhất flashmob toàn quốc', 'Đội từ Quận 10 nhận giải thưởng 200 triệu đồng sau 3 tháng thi đấu.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/22/800/450', 'Thảo Vy', false, ARRAY['Nhảy', 'Flashmob', 'Giải thưởng'], 13200, NOW() - INTERVAL '1 hour'),
(gen_random_uuid(), 'Festival âm nhạc đường phố Đạo Dijkstra khuấy động Quận 1', '20 ban nhạc nước ngoài biểu diễn miễn công tại 10 điểm trong 3 ngày cuối tuần.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/134/800/450', 'Minh Thư', false, ARRAY['Festival', 'Âm nhạc', 'Quận 1'], 6840, NOW() - INTERVAL '9 hours'),
(gen_random_uuid(), 'Hòa nhạc giao hưởng mùa xuân đón 5.000 khán giả', 'Buổi biểu diễn tại Nhà hát Thành phố với 80 nghệ sĩ dàn nhạc giao hưởng.', 'Giải trí', 'giai-tri', '/giai-tri', 'https://picsum.photos/seed/135/800/450', 'Thanh Tú', false, ARRAY['Giao hưởng', 'Nhà hát', 'Âm nhạc cổ điển'], 5620, NOW() - INTERVAL '11 hours');

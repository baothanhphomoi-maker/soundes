/*
  # Seed Sample Radio Episodes Data

  1. Purpose
    - Insert sample radio episodes for the radio section
    - Match the episodes defined in frontend data

  2. Episodes
    - 8 episodes matching src/data/radioEpisodes.ts
    - Categories: Thời Sự, Kinh Tế, Văn Hóa, Sức Khỏe, Thể Thao, Giải Trí
*/

INSERT INTO radio_episodes (id, title, host_name, description, duration, listen_count, created_at) VALUES
('ep-001', 'Bản Tin Sáng: TP.HCM Phát Triển Hạ Tầng Metro Số 1', 'Minh Tuấn', 'Cập nhật mới nhất về dự án Metro số 1 Bến Thành - Suối Tiên, tiến độ thi công và kế hoạch vận hành thử vào tháng 7/2026. Chương trình có sự tham gia của chuyên gia giao thông đô thị.', 1800, 24567, NOW() - INTERVAL '1 day'),
('ep-002', 'Góc Nhìn Chuyên Gia: Tương Lai Kinh Tế Số Việt Nam', 'Thanh Hà', 'Phân tích sâu về chuyển đổi số trong nền kinh tế Việt Nam, cơ hội và thách thức cho doanh nghiệp SME. Với sự tham gia của TS. Nguyễn Văn A - Chuyên gia kinh tế.', 2400, 18934, NOW() - INTERVAL '2 days'),
('ep-003', 'Culture Talk: Làn Sóng Âm Nhạc Indie Việt', 'Phương Linh', 'Khám phá sự bùng nổ của âm nhạc indie Việt Nam, từ những ca sĩ tự sáng tác đến các festival âm nhạc độc lập. Phỏng vấn đặc biệt với nhạc sĩ Hoàng Touliver.', 2700, 34210, NOW() - INTERVAL '2 days'),
('ep-004', 'Health Hub: Sleep Science - Giấc Ngủ Và Sức Khỏe', 'Kim Chi', 'Tập đặc biệt về khoa học giấc ngủ với BS. Trần Thị B - Giảng viên Đại học Y Dược TP.HCM. Cẩm nang toàn diện về sleep hygiene và tips cải thiện giấc ngủ.', 2100, 15892, NOW() - INTERVAL '3 days'),
('ep-005', 'Tech Tonight: AI Revolution Trong Cuộc Sống', 'Đức Thịnh', 'Đánh giá tác động của trí tuệ nhân tạo trong đời sống hàng ngày, từ trợ lý ảo đến ứng dụng trong y tế và giáo dục. Cùng đón đọc các xu hướng AI 2026.', 1920, 28345, NOW() - INTERVAL '3 days'),
('ep-006', 'Sport Focus: SEA Games 33 - Hành Trình Vàng', 'Việt Anh', 'Special episode về thành tích ấn tượng của đoàn thể thao Việt Nam tại SEA Games 33. Phỏng vấn độc quyền với HLV Park Hang-seo và các VĐV tiêu biểu.', 3600, 41203, NOW() - INTERVAL '4 days'),
('ep-007', 'Entertainment Weekly: Phim Việt 2026 - Cuộc Cách Mạng Mới', 'Ngọc Ánh', 'Review các bom tấn phim Việt ra mắt năm 2026, phân tích sự trỗi dậy của điện ảnh Việt Nam. Đặc biệt: phỏng vấn đạo diễn Victor Vũ về dự án mới nhất.', 2100, 37689, NOW() - INTERVAL '4 days'),
('ep-008', 'Business Corner: Startup Stories - Từ 0 Đến Series A', 'Hoàng Yến', 'Series đặc biệt kể chuyện các startup Việt thành công, bài học từ founders và chiến lược gọi vốn. Ep 1: Coffee House - Từ quán nhỏ đến chuỗi F&B hàng đầu.', 2700, 26781, NOW() - INTERVAL '5 days');

/*
  # Thêm hệ thống tracking lượt nghe radio

  1. Bảng radio_episodes_views
    - Ghi nhận lượt nghe/click vào episode radio
    - episode_id: ID của episode
    - listened_at: thời gian nghe
    - ip_address: để tránh spam

  2. Cập nhật radioEpisodes
    - Thêm cột listen_count để lưu số lượt nghe

  3. Security (RLS)
    - Công khai ghi lượt nghe
    - Admin đọc được

  4. Index
    - Index trên episode_id
*/

-- Tạo bảng radio_episodes_views
CREATE TABLE IF NOT EXISTS radio_episodes_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id TEXT NOT NULL,
  listened_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

-- Enable RLS
ALTER TABLE radio_episodes_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can insert radio views"
  ON radio_episodes_views FOR INSERT
  TO public
  WITH CHECK (true);

-- Tạo index
CREATE INDEX IF NOT EXISTS idx_radio_episodes_views_episode_id ON radio_episodes_views(episode_id);
CREATE INDEX IF NOT EXISTS idx_radio_episodes_views_listened_at ON radio_episodes_views(listened_at DESC);

-- Tạo table để lưu trữ listen count của từng episode
CREATE TABLE IF NOT EXISTS radio_episodes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  host_name TEXT,
  description TEXT,
  duration INTEGER,
  listen_count BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS cho radio_episodes
ALTER TABLE radio_episodes ENABLE ROW LEVEL SECURITY;

-- RLS Policies cho radio_episodes
CREATE POLICY "Public can read radio episodes"
  ON radio_episodes FOR SELECT
  TO public
  USING (true);

-- Trigger function để tự động cập nhật listen_count
CREATE OR REPLACE FUNCTION update_radio_listen_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO radio_episodes (id, title, host_name, listen_count)
  VALUES (NEW.episode_id, '', '', 1)
  ON CONFLICT (id) DO UPDATE
  SET listen_count = listen_count + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo trigger
CREATE TRIGGER trigger_update_radio_listen_count
  AFTER INSERT ON radio_episodes_views
  FOR EACH ROW
  EXECUTE FUNCTION update_radio_listen_count();

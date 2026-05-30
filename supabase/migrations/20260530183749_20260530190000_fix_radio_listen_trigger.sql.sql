/*
  # Fix Radio Listen Count Trigger

  1. Purpose
    - Fix column ambiguity error in update_radio_listen_count trigger
    - Ensure listen_count increments correctly

  2. Changes
    - Update trigger function to use table aliases
*/

-- Drop old trigger
DROP TRIGGER IF EXISTS trigger_update_radio_listen_count ON radio_episodes_views;

-- Drop old function  
DROP FUNCTION IF EXISTS update_radio_listen_count();

-- Create new function with proper table aliasing
CREATE OR REPLACE FUNCTION update_radio_listen_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO radio_episodes (id, title, host_name, listen_count)
  VALUES (NEW.episode_id, '', '', 1)
  ON CONFLICT (id) DO UPDATE
  SET listen_count = radio_episodes.listen_count + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER trigger_update_radio_listen_count
  AFTER INSERT ON radio_episodes_views
  FOR EACH ROW
  EXECUTE FUNCTION update_radio_listen_count();

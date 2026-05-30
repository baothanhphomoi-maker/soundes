/*
  # Add Admin Access Policies

  1. Purpose
    - Allow authenticated users (admins) to INSERT, UPDATE, DELETE articles
    - Allow authenticated users (admins) to INSERT, UPDATE, DELETE radio_episodes

  2. Security
    - Only authenticated users can modify content
    - Public can still read all content
*/

-- Articles: Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Articles: Allow authenticated users to update
CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Articles: Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Radio Episodes: Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert radio episodes"
  ON radio_episodes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Radio Episodes: Allow authenticated users to update
CREATE POLICY "Authenticated users can update radio episodes"
  ON radio_episodes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Radio Episodes: Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete radio episodes"
  ON radio_episodes FOR DELETE
  TO authenticated
  USING (true);

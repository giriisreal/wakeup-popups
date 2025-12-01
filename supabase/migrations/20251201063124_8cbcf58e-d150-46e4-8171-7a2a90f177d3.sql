-- Add new columns to popups table for enhanced functionality
ALTER TABLE public.popups 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS start_delay INTEGER NOT NULL DEFAULT 500,
ADD COLUMN IF NOT EXISTS message_interval INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN IF NOT EXISTS hide_after INTEGER NOT NULL DEFAULT 200000,
ADD COLUMN IF NOT EXISTS position TEXT NOT NULL DEFAULT 'top-right';

-- Create storage bucket for popup images
INSERT INTO storage.buckets (id, name, public)
VALUES ('popup-images', 'popup-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload popup images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'popup-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access to popup images
CREATE POLICY "Public can view popup images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'popup-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own popup images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'popup-images' AND auth.uid()::text = (storage.foldername(name))[1]);
/*
  # Add Multiple Images Support

  1. Database Changes
    - Add `images` JSONB column to products table to store array of image URLs
    - Keep existing `image_url` for backward compatibility
    - Add index on images column for better query performance
  
  2. Migration Notes
    - Safely adds new column without affecting existing data
    - Maintains backward compatibility with single image products
*/

-- Add images column to support multiple images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'images'
  ) THEN
    ALTER TABLE products ADD COLUMN images JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Create index on images column for better query performance
CREATE INDEX IF NOT EXISTS idx_products_images ON products USING GIN (images);

-- Update existing products to move single image_url to images array
UPDATE products 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' 
  THEN jsonb_build_array(image_url)
  ELSE '[]'::jsonb
END
WHERE images = '[]'::jsonb AND image_url IS NOT NULL; 
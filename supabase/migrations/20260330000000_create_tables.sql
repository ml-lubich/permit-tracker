-- Profiles table (may already exist on shared Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add any missing columns to profiles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'full_name') THEN
    ALTER TABLE profiles ADD COLUMN full_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'company_name') THEN
    ALTER TABLE profiles ADD COLUMN company_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone') THEN
    ALTER TABLE profiles ADD COLUMN phone TEXT;
  END IF;
END $$;

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
    CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Permits table
CREATE TABLE IF NOT EXISTS permits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  permit_number TEXT NOT NULL,
  project_name TEXT NOT NULL DEFAULT '',
  project_address TEXT NOT NULL DEFAULT '',
  permit_type TEXT NOT NULL DEFAULT 'Building Permit',
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_date DATE,
  approved_date DATE,
  expiry_date DATE,
  inspector TEXT,
  notes TEXT,
  fee_amount NUMERIC(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE permits ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'permits' AND policyname = 'Users can view own permits') THEN
    CREATE POLICY "Users can view own permits" ON permits FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'permits' AND policyname = 'Users can insert own permits') THEN
    CREATE POLICY "Users can insert own permits" ON permits FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'permits' AND policyname = 'Users can update own permits') THEN
    CREATE POLICY "Users can update own permits" ON permits FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'permits' AND policyname = 'Users can delete own permits') THEN
    CREATE POLICY "Users can delete own permits" ON permits FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Inspections table
CREATE TABLE IF NOT EXISTS inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  permit_id UUID NOT NULL REFERENCES permits(id) ON DELETE CASCADE,
  inspection_type TEXT NOT NULL,
  scheduled_date DATE,
  result TEXT,
  inspector_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inspections' AND policyname = 'Users can view inspections for own permits') THEN
    CREATE POLICY "Users can view inspections for own permits" ON inspections FOR SELECT USING (
      EXISTS (SELECT 1 FROM permits WHERE permits.id = inspections.permit_id AND permits.user_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inspections' AND policyname = 'Users can insert inspections for own permits') THEN
    CREATE POLICY "Users can insert inspections for own permits" ON inspections FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM permits WHERE permits.id = inspections.permit_id AND permits.user_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inspections' AND policyname = 'Users can update inspections for own permits') THEN
    CREATE POLICY "Users can update inspections for own permits" ON inspections FOR UPDATE USING (
      EXISTS (SELECT 1 FROM permits WHERE permits.id = inspections.permit_id AND permits.user_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inspections' AND policyname = 'Users can delete inspections for own permits') THEN
    CREATE POLICY "Users can delete inspections for own permits" ON inspections FOR DELETE USING (
      EXISTS (SELECT 1 FROM permits WHERE permits.id = inspections.permit_id AND permits.user_id = auth.uid())
    );
  END IF;
END $$;

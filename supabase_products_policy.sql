-- ----------------------------------------------------
-- SUPABASE ROW-LEVEL SECURITY (RLS) FOR PRODUCTS TABLE
-- ----------------------------------------------------
-- This script configures row-level security for the "products" table
-- allowing full dynamic insert/update/delete operations from our
-- server actions and admin dashboards, while keeping other tables'
-- security rules completely untouched.
-- ----------------------------------------------------

-- 1. Ensure RLS is active on products table
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing products policy if it exists to avoid duplication conflicts
DROP POLICY IF EXISTS "Allow public read/write/delete on products" ON "products";
DROP POLICY IF EXISTS "Allow all public operations on products" ON "products";
DROP POLICY IF EXISTS "Enable read access for all users" ON "products";

-- 3. Create a single robust policy for ALL operations (select, insert, update, delete)
CREATE POLICY "Allow all public operations on products"
ON "products"
AS PERMISSIVE
FOR ALL
TO public
USING (true)
WITH CHECK (true);

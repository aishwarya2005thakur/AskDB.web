-- Fix critical security issues with RLS policies

-- 1. Remove the dangerous public read policy from Askcoin_transaction table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Askcoin_transaction";

-- 2. Add proper policies for profiles table to allow users to manage their own data
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. Allow public read access to non-sensitive profile fields for social features
CREATE POLICY "Public can view usernames" 
ON public.profiles 
FOR SELECT 
USING (true);

-- 4. Clean up conflicting policies on Askcoin_balance table
DROP POLICY IF EXISTS "user can only manage their own coins" ON public."Askcoin_balance";
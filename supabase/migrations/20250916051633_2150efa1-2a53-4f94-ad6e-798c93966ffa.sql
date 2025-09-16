-- Fix critical security vulnerability: Remove user ability to directly update their cryptocurrency balances
-- Balances should only be modified through controlled transaction processing by service roles

-- Drop the dangerous policy that allows users to update their own balances
DROP POLICY IF EXISTS "users can update their own balances" ON public."Askcoin_balance";

-- Ensure balances can only be modified by service roles or admins through controlled processes
-- (The existing service role and admin policies remain intact for controlled balance management)
-- Create subscription plan enum
CREATE TYPE public.subscription_plan AS ENUM ('free', 'happy_meal');

-- Add subscription fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN plan public.subscription_plan NOT NULL DEFAULT 'free',
ADD COLUMN razorpay_subscription_id text,
ADD COLUMN razorpay_customer_id text,
ADD COLUMN subscription_status text DEFAULT 'inactive',
ADD COLUMN subscription_end_date timestamp with time zone;

-- Create subscriptions table for tracking payment history
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan public.subscription_plan NOT NULL,
  razorpay_subscription_id text NOT NULL,
  razorpay_payment_id text,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  status text NOT NULL,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
ON public.subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if user can create popup based on plan
CREATE OR REPLACE FUNCTION public.can_create_popup(user_id_param uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_plan subscription_plan;
  popup_count integer;
BEGIN
  -- Get user's current plan
  SELECT plan INTO user_plan
  FROM public.profiles
  WHERE user_id = user_id_param;
  
  -- If happy_meal plan, always allow
  IF user_plan = 'happy_meal' THEN
    RETURN true;
  END IF;
  
  -- If free plan, check popup count
  SELECT COUNT(*) INTO popup_count
  FROM public.popups
  WHERE popups.user_id = user_id_param;
  
  -- Free plan allows only 1 popup
  RETURN popup_count < 1;
END;
$$;
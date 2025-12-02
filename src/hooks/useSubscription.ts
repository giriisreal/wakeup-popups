import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export type SubscriptionPlan = 'free' | 'happy_meal';

interface UserProfile {
  plan: SubscriptionPlan;
  subscription_status: string | null;
  subscription_end_date: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      
      // Auto-refresh every 5 seconds to check for subscription updates
      const interval = setInterval(fetchProfile, 5000);
      return () => clearInterval(interval);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('plan, subscription_status, subscription_end_date')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const createSubscription = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe",
        variant: "destructive",
      });
      return null;
    }

    try {
      toast({
        title: "Creating subscription...",
        description: "Please wait while we set up your payment",
      });

      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { plan: 'happy_meal' },
      });

      if (error) throw error;

      // Open Razorpay payment page in new tab
      if (data.short_url) {
        window.open(data.short_url, '_blank');
        
        toast({
          title: "Payment page opened",
          description: "Complete the payment to activate your Happy Meal plan. You may need to allow popups.",
        });
      }

      return data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    profile,
    loading,
    createSubscription,
    refetch: fetchProfile,
  };
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!;

    // Verify webhook signature
    const signature = req.headers.get('x-razorpay-signature');
    const body = await req.text();

    const expectedSignature = createHmac('sha256', razorpayKeySecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    const event = JSON.parse(body);
    console.log('Webhook event:', event.event);

    const { event: eventType, payload } = event;

    // Handle subscription authenticated (payment successful for subscription link)
    if (eventType === 'subscription.authenticated') {
      const subscriptionId = payload.subscription.entity.id;
      const userId = payload.subscription.entity.notes?.user_id;

      if (!userId) {
        console.error('No user_id in subscription notes');
        return new Response(JSON.stringify({ error: 'No user_id' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      // Update profile to happy_meal plan
      await supabase
        .from('profiles')
        .update({
          plan: 'happy_meal',
          razorpay_subscription_id: subscriptionId,
          subscription_status: 'active',
          subscription_end_date: new Date(payload.subscription.entity.end_at * 1000),
        })
        .eq('user_id', userId);

      // Update subscription record
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          razorpay_payment_id: payload.payment?.entity?.id,
          current_period_start: new Date(payload.subscription.entity.current_start * 1000),
          current_period_end: new Date(payload.subscription.entity.current_end * 1000),
        })
        .eq('razorpay_subscription_id', subscriptionId);

      console.log(`Subscription authenticated for user: ${userId}`);
    }

    // Handle subscription activated/charged
    if (eventType === 'subscription.activated' || eventType === 'subscription.charged') {
      const subscriptionId = payload.subscription.entity.id;
      const userId = payload.subscription.entity.notes?.user_id;

      if (!userId) {
        console.error('No user_id in subscription notes');
        return new Response(JSON.stringify({ error: 'No user_id' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      // Update profile to happy_meal plan
      await supabase
        .from('profiles')
        .update({
          plan: 'happy_meal',
          razorpay_subscription_id: subscriptionId,
          subscription_status: 'active',
          subscription_end_date: new Date(payload.subscription.entity.end_at * 1000),
        })
        .eq('user_id', userId);

      // Update subscription record
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          razorpay_payment_id: payload.payment?.entity?.id,
          current_period_end: new Date(payload.subscription.entity.end_at * 1000),
        })
        .eq('razorpay_subscription_id', subscriptionId);

      console.log(`Subscription activated for user: ${userId}`);
    }

    // Handle subscription cancelled
    if (eventType === 'subscription.cancelled') {
      const subscriptionId = payload.subscription.entity.id;

      // Update profile back to free plan
      await supabase
        .from('profiles')
        .update({
          plan: 'free',
          subscription_status: 'cancelled',
        })
        .eq('razorpay_subscription_id', subscriptionId);

      // Update subscription record
      await supabase
        .from('subscriptions')
        .update({
          status: 'cancelled',
        })
        .eq('razorpay_subscription_id', subscriptionId);

      console.log(`Subscription cancelled: ${subscriptionId}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

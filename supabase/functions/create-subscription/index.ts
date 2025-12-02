import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateSubscriptionRequest {
  plan: 'happy_meal';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user');
    }

    const { plan }: CreateSubscriptionRequest = await req.json();

    if (plan !== 'happy_meal') {
      throw new Error('Invalid plan');
    }

    // Get or create Razorpay customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, razorpay_customer_id')
      .eq('user_id', user.id)
      .single();

    let customerId = profile?.razorpay_customer_id;

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    const razorpayPlanId = 'plan_RmfUMPdC7G4Yjv'; // ₹100/month plan

    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    // Create customer if doesn't exist
    if (!customerId) {
      const customerResponse = await fetch('https://api.razorpay.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profile?.email,
          fail_existing: '0',
        }),
      });

      const customerData = await customerResponse.json();
      customerId = customerData.id;

      // Update profile with customer ID
      await supabase
        .from('profiles')
        .update({ razorpay_customer_id: customerId })
        .eq('user_id', user.id);
    }

    // Create subscription
    const subscriptionResponse = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: razorpayPlanId,
        customer_id: customerId,
        total_count: 12, // 12 months
        quantity: 1,
        customer_notify: 1,
        notes: {
          user_id: user.id,
        },
      }),
    });

    const subscription = await subscriptionResponse.json();

    console.log('Subscription created:', subscription);

    // Store subscription in database
    await supabase.from('subscriptions').insert({
      user_id: user.id,
      plan: 'happy_meal',
      razorpay_subscription_id: subscription.id,
      amount: 10000, // ₹100 in paise
      currency: 'INR',
      status: subscription.status,
      current_period_start: new Date(subscription.start_at * 1000),
      current_period_end: new Date(subscription.end_at * 1000),
    });

    return new Response(
      JSON.stringify({
        subscription_id: subscription.id,
        short_url: subscription.short_url,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

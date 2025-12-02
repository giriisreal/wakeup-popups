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
      .select('email, phone, full_name, razorpay_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    let customerId = profile?.razorpay_customer_id;

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    const razorpayPlanId = 'plan_RmfUMPdC7G4Yjv'; // ₹100/month plan

    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    // Generate customer details (required by Razorpay) - contact must be a number
    const customerName = profile?.full_name || 'Customer';
    const customerPhone = parseInt(profile?.phone || '9999999999', 10);

    // Create customer if doesn't exist
    if (!customerId) {
      const customerResponse = await fetch('https://api.razorpay.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          email: profile?.email,
          contact: customerPhone,
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

    // Create subscription link (for hosted checkout page)
    const subscriptionLinkResponse = await fetch('https://api.razorpay.com/v1/subscription_registration/auth_links', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: {
          name: customerName,
          email: profile?.email,
          contact: customerPhone,
        },
        type: 'link',
        amount: 10000, // ₹100 in paise
        currency: 'INR',
        description: 'Happy Meal Subscription',
        subscription_registration: {
          plan_id: razorpayPlanId,
          customer_notify: 1,
          quantity: 1,
          total_count: 12,
        },
        receipt: `receipt_${user.id}_${Date.now()}`,
        expire_by: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
        sms_notify: 1,
        email_notify: 1,
        notes: {
          user_id: user.id,
        },
      }),
    });

    const subscriptionLink = await subscriptionLinkResponse.json();

    if (!subscriptionLinkResponse.ok) {
      console.error('Razorpay error:', subscriptionLink);
      throw new Error(subscriptionLink.error?.description || 'Failed to create subscription link');
    }

    console.log('Subscription link created:', subscriptionLink);

    // Store initial subscription record
    const { data: subRecord } = await supabase.from('subscriptions').insert({
      user_id: user.id,
      plan: 'happy_meal',
      razorpay_subscription_id: subscriptionLink.id,
      amount: 10000,
      currency: 'INR',
      status: 'pending',
    }).select().single();

    return new Response(
      JSON.stringify({
        subscription_id: subscriptionLink.id,
        short_url: subscriptionLink.short_url,
        payment_url: subscriptionLink.short_url,
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

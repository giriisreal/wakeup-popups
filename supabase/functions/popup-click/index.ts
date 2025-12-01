import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const popupId = url.searchParams.get('id');

  if (!popupId) {
    return new Response(JSON.stringify({ error: 'No popup ID' }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }

  console.log(`Recording click for popup: ${popupId}`);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: popup } = await supabase
    .from('popups')
    .select('clicks')
    .eq('id', popupId)
    .single();

  if (popup) {
    await supabase
      .from('popups')
      .update({ clicks: popup.clicks + 1 })
      .eq('id', popupId);
  }

  return new Response(JSON.stringify({ success: true }), { 
    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
  });
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/javascript',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const popupId = url.searchParams.get('id');

  if (!popupId) {
    return new Response('// Error: No popup ID provided', { headers: corsHeaders });
  }

  console.log(`Fetching popup with ID: ${popupId}`);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: popup, error } = await supabase
    .from('popups')
    .select('*')
    .eq('id', popupId)
    .eq('active', true)
    .single();

  if (error || !popup) {
    console.error('Popup not found or inactive:', error);
    return new Response('// Popup not found or inactive', { headers: corsHeaders });
  }

  // Track view
  await supabase
    .from('popups')
    .update({ views: popup.views + 1 })
    .eq('id', popupId);

  console.log(`Serving popup: ${popup.title}`);

  const script = `
(function() {
  if (window.__poopup_${popupId.replace(/-/g, '_')}_loaded) return;
  window.__poopup_${popupId.replace(/-/g, '_')}_loaded = true;

  var popup = ${JSON.stringify(popup)};
  
  var overlay = document.createElement('div');
  overlay.id = 'poopup-overlay-${popupId}';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;';
  
  var container = document.createElement('div');
  container.style.cssText = 'background:' + popup.background_color + ';color:' + popup.text_color + ';padding:32px;border-radius:16px;max-width:400px;width:90%;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);transform:scale(0.9);transition:transform 0.3s ease;';
  
  var icon = document.createElement('div');
  icon.style.cssText = 'font-size:48px;margin-bottom:16px;';
  icon.textContent = popup.icon;
  
  var title = document.createElement('h2');
  title.style.cssText = 'font-size:24px;font-weight:bold;margin:0 0 12px 0;';
  title.textContent = popup.title;
  
  var message = document.createElement('p');
  message.style.cssText = 'font-size:16px;margin:0 0 24px 0;opacity:0.9;';
  message.textContent = popup.message;
  
  var button = document.createElement('button');
  button.style.cssText = 'background:' + popup.text_color + ';color:' + popup.background_color + ';border:none;padding:12px 32px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:transform 0.2s ease;';
  button.textContent = popup.button_text;
  button.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
  button.onmouseout = function() { this.style.transform = 'scale(1)'; };
  button.onclick = function() {
    fetch('${Deno.env.get('SUPABASE_URL')}/functions/v1/popup-click?id=${popupId}', { method: 'POST' });
    overlay.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    setTimeout(function() { overlay.remove(); }, 300);
  };
  
  var close = document.createElement('button');
  close.style.cssText = 'position:absolute;top:12px;right:12px;background:transparent;border:none;color:' + popup.text_color + ';font-size:24px;cursor:pointer;opacity:0.6;';
  close.innerHTML = '&times;';
  close.onclick = function() {
    overlay.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    setTimeout(function() { overlay.remove(); }, 300);
  };
  
  container.style.position = 'relative';
  container.appendChild(close);
  container.appendChild(icon);
  container.appendChild(title);
  container.appendChild(message);
  container.appendChild(button);
  overlay.appendChild(container);
  
  document.body.appendChild(overlay);
  
  setTimeout(function() {
    overlay.style.opacity = '1';
    container.style.transform = 'scale(1)';
  }, 100);
})();
`;

  return new Response(script, { headers: corsHeaders });
});

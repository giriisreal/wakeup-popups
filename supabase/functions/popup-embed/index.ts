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

  const startDelay = popup.start_delay || 500;
  const hideAfter = popup.hide_after || 200000;
  const messageInterval = popup.message_interval || 0;

  const script = `
(function() {
  if (window.__poopup_${popupId.replace(/-/g, '_')}_loaded) return;
  window.__poopup_${popupId.replace(/-/g, '_')}_loaded = true;

  var popup = ${JSON.stringify(popup)};
  var startDelay = ${startDelay};
  var hideAfter = ${hideAfter};
  var messageInterval = ${messageInterval};
  var isVisible = false;
  
  function getTopPosition() {
    var existingPopups = document.querySelectorAll('[id^="poopup-container-"]');
    var totalHeight = 20;
    for (var i = 0; i < existingPopups.length; i++) {
      if (existingPopups[i].style.transform === 'translateX(0px)') {
        totalHeight += existingPopups[i].offsetHeight + 12;
      }
    }
    return totalHeight;
  }
  
  function showPopup() {
    if (isVisible) return;
    isVisible = true;
    
    var topPos = getTopPosition();
    var container = document.createElement('div');
    container.id = 'poopup-container-${popupId}';
    container.style.cssText = 'position:fixed;top:' + topPos + 'px;right:20px;z-index:999999;transform:translateX(120%);transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);';
    
    var card = document.createElement('div');
    card.style.cssText = 'background:#f5f0e8;border-radius:16px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,0.15);border:1px solid #e5ddd0;max-width:320px;display:flex;align-items:flex-start;gap:12px;cursor:pointer;';
    
    // Avatar/Image
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width:48px;height:48px;border-radius:12px;overflow:hidden;flex-shrink:0;background:#e5ddd0;';
    if (popup.image_url) {
      var img = document.createElement('img');
      img.src = popup.image_url;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      avatar.appendChild(img);
    } else {
      avatar.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">📷</div>';
    }
    
    // Content
    var content = document.createElement('div');
    content.style.cssText = 'flex:1;min-width:0;';
    
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px;';
    
    var title = document.createElement('span');
    title.style.cssText = 'font-weight:600;color:#1a1a1a;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
    title.textContent = popup.title || 'Notification';
    
    var time = document.createElement('span');
    time.style.cssText = 'font-size:12px;color:#8b8680;flex-shrink:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
    time.textContent = '1m';
    
    header.appendChild(title);
    header.appendChild(time);
    
    var message = document.createElement('p');
    message.style.cssText = 'font-size:14px;color:#4a4a4a;margin:4px 0 0 0;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
    message.textContent = popup.message || '';
    
    content.appendChild(header);
    content.appendChild(message);
    
    card.appendChild(avatar);
    card.appendChild(content);
    container.appendChild(card);
    
    function hidePopup() {
      container.style.transform = 'translateX(120%)';
      setTimeout(function() { 
        if (container.parentNode) container.remove(); 
        isVisible = false;
      }, 400);
    }
    
    // Close on click
    card.onclick = function() {
      fetch('${Deno.env.get('SUPABASE_URL')}/functions/v1/popup-click?id=${popupId}', { method: 'POST' });
      hidePopup();
    };
    
    document.body.appendChild(container);
    
    // Animate in
    setTimeout(function() {
      container.style.transform = 'translateX(0)';
    }, 50);
    
    // Auto hide
    setTimeout(function() {
      if (container.parentNode) {
        hidePopup();
      }
    }, hideAfter);
  }
  
  // Start after initial delay
  setTimeout(showPopup, startDelay);
  
  // Repeat at interval if set
  if (messageInterval > 0) {
    setInterval(showPopup, messageInterval);
  }
})();
`;

  return new Response(script, { headers: corsHeaders });
});

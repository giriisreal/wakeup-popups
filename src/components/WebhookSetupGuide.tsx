import { AlertCircle, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";

const WebhookSetupGuide = () => {
  const webhookUrl = "https://prwxjgtesrmjvuhegyte.supabase.co/functions/v1/razorpay-webhook";
  const { refetch, profile } = useSubscription();

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Copied!",
      description: "Webhook URL copied to clipboard",
    });
  };

  const handleRefresh = async () => {
    await refetch();
    toast({
      title: "Refreshed",
      description: "Subscription status updated",
    });
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-primary/20 rounded-full p-3">
          <AlertCircle className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Razorpay Webhook Setup Required
          </h3>
          <p className="text-muted-foreground mb-4">
            To automatically activate subscriptions after payment, add this webhook URL to your Razorpay dashboard:
          </p>
          
          <div className="bg-background rounded-lg p-4 mb-4 border border-border">
            <code className="text-sm text-foreground break-all">{webhookUrl}</code>
          </div>

          <div className="flex gap-3 mb-4">
            <Button onClick={copyWebhookUrl} size="sm" variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              Copy URL
            </Button>
            <Button 
              onClick={() => window.open('https://dashboard.razorpay.com/app/webhooks', '_blank')}
              size="sm" 
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Razorpay Dashboard
            </Button>
            {profile?.plan === 'free' && (
              <Button onClick={handleRefresh} size="sm" variant="secondary" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Check Status
              </Button>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Setup Steps:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to Razorpay Dashboard → Settings → Webhooks</li>
              <li>Click "Create New Webhook"</li>
              <li>Paste the webhook URL above</li>
              <li>Select these events:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><code>subscription.authenticated</code></li>
                  <li><code>subscription.activated</code></li>
                  <li><code>subscription.charged</code></li>
                  <li><code>subscription.cancelled</code></li>
                </ul>
              </li>
              <li>Save the webhook</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookSetupGuide;

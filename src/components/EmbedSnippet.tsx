import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface EmbedSnippetProps {
  popupId: string;
}

const EmbedSnippet = ({ popupId }: EmbedSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const snippet = `<script src="https://cdn.poopup.co/${popupId}.js" async></script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-xl font-bold text-foreground mb-4">Your Embed Code</h3>
      <p className="text-muted-foreground mb-4">
        Copy this code and paste it into your website's <code className="bg-secondary px-2 py-1 rounded">&lt;head&gt;</code> section.
      </p>

      <div className="relative">
        <pre className="bg-secondary rounded-xl p-4 overflow-x-auto text-sm text-foreground font-mono">
          {snippet}
        </pre>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="font-semibold text-foreground">Works with:</h4>
        <div className="flex flex-wrap gap-2">
          {["WordPress", "Shopify", "Wix", "Squarespace", "Webflow", "HTML"].map((platform) => (
            <span
              key={platform}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmbedSnippet;

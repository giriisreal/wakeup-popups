import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

interface UpgradePromptProps {
  popupCount: number;
  popupLimit: number;
}

const UpgradePrompt = ({ popupCount, popupLimit }: UpgradePromptProps) => {
  const { createSubscription } = useSubscription();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    await createSubscription();
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="bg-primary/20 rounded-full p-3">
          <AlertCircle className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">
            You're on the Free plan
          </h3>
          <p className="text-muted-foreground mb-4">
            You've used {popupCount} of {popupLimit} poppy. Upgrade to Happy Meal for unlimited poppys and websites!
          </p>
          <div className="flex gap-3">
            <Button onClick={handleUpgrade} size="sm">
              Upgrade to Happy Meal 🎉
            </Button>
            <Button onClick={() => navigate('/pricing')} variant="outline" size="sm">
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;

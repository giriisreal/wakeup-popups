import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PopupPreviewProps {
  title: string;
  message: string;
  icon: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  animation: string;
}

const PopupPreview = ({
  title,
  message,
  icon,
  buttonText,
  backgroundColor,
  textColor,
  animation,
}: PopupPreviewProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case "bounce":
        return "animate-bounce-soft";
      case "shake":
        return "animate-shake";
      case "float":
        return "animate-float";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div
        className={`rounded-2xl p-6 shadow-2xl border border-border ${getAnimationClass()}`}
        style={{ backgroundColor, color: textColor }}
      >
        <button className="absolute top-3 right-3 opacity-50 hover:opacity-100 transition-opacity">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-5xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title || "Your Title Here"}</h3>
          <p className="text-sm opacity-90 mb-6">
            {message || "Your compelling message goes here..."}
          </p>
          <Button
            className="w-full"
            style={{
              backgroundColor: textColor,
              color: backgroundColor,
            }}
          >
            {buttonText || "Take Action"}
          </Button>
        </div>
      </div>

      <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-2xl rounded-3xl -z-10" />
    </div>
  );
};

export default PopupPreview;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PopupPreview from "./PopupPreview";

const iconOptions = ["⚠️", "🔥", "💔", "⏰", "🚨", "💰", "🎁", "😱", "🤯", "💸", "🛑", "👀"];
const animationOptions = [
  { value: "none", label: "None" },
  { value: "bounce", label: "Bounce" },
  { value: "shake", label: "Shake" },
  { value: "float", label: "Float" },
];

const colorPresets = [
  { bg: "#1e293b", text: "#f8fafc" },
  { bg: "#f59e0b", text: "#1e293b" },
  { bg: "#dc2626", text: "#ffffff" },
  { bg: "#059669", text: "#ffffff" },
  { bg: "#7c3aed", text: "#ffffff" },
  { bg: "#0ea5e9", text: "#ffffff" },
];

interface PopupBuilderProps {
  onSave?: (popup: PopupData) => void;
  initialData?: PopupData;
}

export interface PopupData {
  id?: string;
  title: string;
  message: string;
  icon: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  animation: string;
}

const PopupBuilder = ({ onSave, initialData }: PopupBuilderProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [message, setMessage] = useState(initialData?.message || "");
  const [icon, setIcon] = useState(initialData?.icon || "⚠️");
  const [buttonText, setButtonText] = useState(initialData?.buttonText || "Take Action");
  const [backgroundColor, setBackgroundColor] = useState(initialData?.backgroundColor || "#1e293b");
  const [textColor, setTextColor] = useState(initialData?.textColor || "#f8fafc");
  const [animation, setAnimation] = useState(initialData?.animation || "none");

  const handleSave = () => {
    if (onSave) {
      onSave({
        id: initialData?.id || crypto.randomUUID(),
        title,
        message,
        icon,
        buttonText,
        backgroundColor,
        textColor,
        animation,
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Builder Form */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-foreground">Popup Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wait! Before you go..."
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-foreground">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="93% of visitors never return. Don't be a statistic."
            className="mt-2"
            rows={3}
          />
        </div>

        <div>
          <Label className="text-foreground">Icon</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {iconOptions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setIcon(emoji)}
                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center border-2 transition-all ${
                  icon === emoji
                    ? "border-primary bg-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="buttonText" className="text-foreground">Button Text</Label>
          <Input
            id="buttonText"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Claim My Discount"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-foreground">Color Preset</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colorPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  setBackgroundColor(preset.bg);
                  setTextColor(preset.text);
                }}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  backgroundColor === preset.bg
                    ? "border-primary scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: preset.bg }}
              />
            ))}
          </div>
        </div>

        <div>
          <Label className="text-foreground">Animation</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {animationOptions.map((anim) => (
              <button
                key={anim.value}
                onClick={() => setAnimation(anim.value)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  animation === anim.value
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                {anim.label}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} variant="default" size="lg" className="w-full">
          Save Popup
        </Button>
      </div>

      {/* Live Preview */}
      <div className="lg:sticky lg:top-24">
        <Label className="text-foreground mb-4 block">Live Preview</Label>
        <div className="bg-secondary/30 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
          <PopupPreview
            title={title}
            message={message}
            icon={icon}
            buttonText={buttonText}
            backgroundColor={backgroundColor}
            textColor={textColor}
            animation={animation}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupBuilder;

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, Trash2, GripVertical, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import PopupPreview from "./PopupPreview";

export interface PopupFormData {
  title: string;
  message: string;
  icon: string;
  button_text: string;
  background_color: string;
  text_color: string;
  animation: string;
  image_url?: string;
  start_delay: number;
  message_interval: number;
  hide_after: number;
}

interface PopupBuilderProps {
  onSave: (data: PopupFormData) => Promise<void>;
  initialData?: PopupFormData;
  isEditing?: boolean;
  isSaving?: boolean;
}

const PopupBuilder = ({ onSave, initialData, isEditing = false, isSaving = false }: PopupBuilderProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [message, setMessage] = useState(initialData?.message || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [startDelay, setStartDelay] = useState(initialData?.start_delay || 500);
  const [messageInterval, setMessageInterval] = useState(initialData?.message_interval || 1000);
  const [hideAfter, setHideAfter] = useState(initialData?.hide_after || 200000);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setMessage(initialData.message);
      setImageUrl(initialData.image_url || "");
      setStartDelay(initialData.start_delay || 500);
      setMessageInterval(initialData.message_interval || 1000);
      setHideAfter(initialData.hide_after || 200000);
    }
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('popup-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('popup-images')
        .getPublicUrl(fileName);

      setImageUrl(publicUrl);
      toast({
        title: "Image uploaded!",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    await onSave({
      title,
      message,
      icon: "📢",
      button_text: "Close",
      background_color: "#f5f0e8",
      text_color: "#1a1a1a",
      animation: "slide",
      image_url: imageUrl,
      start_delay: startDelay,
      message_interval: messageInterval,
      hide_after: hideAfter,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Settings Panel */}
      <div className="space-y-8">
        <div className="bg-card rounded-3xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-6">Timing Settings</h3>
          
          <div className="space-y-5">
            <div>
              <Label className="text-sm text-muted-foreground">Start Poppy after (ms)</Label>
              <Input
                type="number"
                value={startDelay}
                onChange={(e) => setStartDelay(Number(e.target.value))}
                className="mt-2 bg-background border-border rounded-xl"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Send message every (ms)</Label>
              <Input
                type="number"
                value={messageInterval}
                onChange={(e) => setMessageInterval(Number(e.target.value))}
                className="mt-2 bg-background border-border rounded-xl"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Hide message after (ms)</Label>
              <Input
                type="number"
                value={hideAfter}
                onChange={(e) => setHideAfter(Number(e.target.value))}
                className="mt-2 bg-background border-border rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Message Builder */}
      <div className="space-y-6">
        <div className="bg-card rounded-3xl p-6 border border-dashed border-border">
          {/* Message Card */}
          <div className="bg-background rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-start gap-3">
              {/* Drag Handle */}
              <div className="text-muted-foreground cursor-grab">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Image Upload */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors flex-shrink-0"
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                ) : imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Camera className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Title & Message Inputs */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Angry Customer"
                    className="border-border rounded-full bg-card text-sm font-medium"
                  />
                  <span className="text-xs text-muted-foreground flex-shrink-0 px-2">now</span>
                </div>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="WHERE IS MY INVOICE?!"
                  className="border-border rounded-full bg-card text-sm uppercase tracking-wide"
                />
              </div>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end mt-3">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Add Message Button - Coming Soon */}
          <Button
            variant="outline"
            disabled
            className="w-full mt-4 rounded-full opacity-50 cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Message (Coming Soon)
          </Button>
        </div>

        {/* Update Button */}
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            isEditing ? "Update" : "Create Popup"
          )}
        </Button>

        {/* Live Preview */}
        <div className="mt-8">
          <Label className="text-sm text-muted-foreground mb-4 block">Live Preview</Label>
          <div className="flex justify-end">
            <PopupPreview
              title={title}
              message={message}
              imageUrl={imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBuilder;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupBuilder, { PopupFormData } from "@/components/PopupBuilder";
import EmbedSnippet from "@/components/EmbedSnippet";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { usePopups } from "@/hooks/usePopups";
import { LogIn } from "lucide-react";

const Create = () => {
  const { user, loading: authLoading } = useAuth();
  const { popups, createPopup, updatePopup } = usePopups();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [savedPopupId, setSavedPopupId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState<PopupFormData | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  // Load popup data if editing
  useEffect(() => {
    if (editId && popups.length > 0) {
      const popup = popups.find((p) => p.id === editId);
      if (popup) {
        setInitialData({
          title: popup.title,
          message: popup.message,
          icon: popup.icon,
          button_text: popup.button_text,
          background_color: popup.background_color,
          text_color: popup.text_color,
          animation: popup.animation,
          image_url: popup.image_url,
          start_delay: popup.start_delay,
          message_interval: popup.message_interval,
          hide_after: popup.hide_after,
        });
        setIsEditing(true);
        setSavedPopupId(popup.id);
      }
    }
  }, [editId, popups]);

  const handleSave = async (data: PopupFormData) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to save your popup.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && editId) {
        const success = await updatePopup(editId, data);
        if (success) {
          toast({
            title: "Popup updated! 🎉",
            description: "Your changes have been saved.",
          });
          setSavedPopupId(editId);
        }
      } else {
        const newPopup = await createPopup(data);
        if (newPopup) {
          toast({
            title: "Popup created! 🎉",
            description: "Your popup is ready to use.",
          });
          setSavedPopupId(newPopup.id);
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isEditing ? "Edit Your Popup" : "Create Your Popup"}
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Design a wake-up call popup that converts visitors into customers
            </p>
          </div>

          {!authLoading && !user && (
            <div className="bg-card/50 border border-border rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Create an account to save your popups and get embed codes.
              </p>
              <Link to="/auth">
                <Button variant="default" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Log in or Sign up
                </Button>
              </Link>
            </div>
          )}

          <PopupBuilder
            onSave={handleSave}
            initialData={initialData}
            isEditing={isEditing}
            isSaving={isSaving}
          />

          {savedPopupId && user && (
            <div className="mt-12 max-w-2xl mx-auto">
              <EmbedSnippet popupId={savedPopupId} />
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupBuilder, { PopupData } from "@/components/PopupBuilder";
import EmbedSnippet from "@/components/EmbedSnippet";
import { toast } from "@/hooks/use-toast";

const Create = () => {
  const [savedPopup, setSavedPopup] = useState<PopupData | null>(null);

  const handleSave = (popup: PopupData) => {
    setSavedPopup(popup);
    toast({
      title: "Popup saved! 🎉",
      description: "Your popup has been created successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Create Your Popup
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design a wake-up call popup that converts visitors into customers
            </p>
          </div>

          <PopupBuilder onSave={handleSave} />

          {savedPopup && (
            <div className="mt-12 max-w-2xl mx-auto">
              <EmbedSnippet popupId={savedPopup.id || "demo"} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;

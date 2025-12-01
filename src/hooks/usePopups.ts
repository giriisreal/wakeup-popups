import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface Popup {
  id: string;
  user_id: string;
  title: string;
  message: string;
  icon: string;
  button_text: string;
  background_color: string;
  text_color: string;
  animation: string;
  active: boolean;
  views: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface PopupFormData {
  title: string;
  message: string;
  icon: string;
  button_text: string;
  background_color: string;
  text_color: string;
  animation: string;
}

export const usePopups = () => {
  const { user } = useAuth();
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPopups = async () => {
    if (!user) {
      setPopups([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("popups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPopups(data || []);
    } catch (error) {
      console.error("Error fetching popups:", error);
      toast({
        title: "Error",
        description: "Failed to load popups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, [user]);

  const createPopup = async (data: PopupFormData): Promise<Popup | null> => {
    if (!user) return null;

    try {
      const { data: newPopup, error } = await supabase
        .from("popups")
        .insert({
          user_id: user.id,
          title: data.title,
          message: data.message,
          icon: data.icon,
          button_text: data.button_text,
          background_color: data.background_color,
          text_color: data.text_color,
          animation: data.animation,
        })
        .select()
        .single();

      if (error) throw error;

      setPopups((prev) => [newPopup, ...prev]);
      return newPopup;
    } catch (error) {
      console.error("Error creating popup:", error);
      toast({
        title: "Error",
        description: "Failed to create popup",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePopup = async (id: string, data: Partial<PopupFormData & { active: boolean }>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("popups")
        .update(data)
        .eq("id", id);

      if (error) throw error;

      setPopups((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      return true;
    } catch (error) {
      console.error("Error updating popup:", error);
      toast({
        title: "Error",
        description: "Failed to update popup",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePopup = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("popups").delete().eq("id", id);

      if (error) throw error;

      setPopups((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting popup:", error);
      toast({
        title: "Error",
        description: "Failed to delete popup",
        variant: "destructive",
      });
      return false;
    }
  };

  const duplicatePopup = async (popup: Popup): Promise<Popup | null> => {
    return createPopup({
      title: `${popup.title} (Copy)`,
      message: popup.message,
      icon: popup.icon,
      button_text: popup.button_text,
      background_color: popup.background_color,
      text_color: popup.text_color,
      animation: popup.animation,
    });
  };

  return {
    popups,
    loading,
    createPopup,
    updatePopup,
    deletePopup,
    duplicatePopup,
    refetch: fetchPopups,
  };
};

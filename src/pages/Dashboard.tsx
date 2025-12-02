import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Copy, Pencil, Trash2, BarChart3, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePopups } from "@/hooks/usePopups";
import { useSubscription } from "@/hooks/useSubscription";
import UpgradePrompt from "@/components/UpgradePrompt";

const Dashboard = () => {
  const { popups, loading, updatePopup, deletePopup, duplicatePopup } = usePopups();
  const { profile } = useSubscription();

  const toggleActive = async (id: string, currentActive: boolean) => {
    const success = await updatePopup(id, { active: !currentActive });
    if (success) {
      toast({
        title: "Status updated",
        description: `Popup is now ${!currentActive ? "active" : "inactive"}.`,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deletePopup(id);
    if (success) {
      toast({
        title: "Popup deleted",
        description: "The popup has been removed.",
      });
    }
  };

  const handleDuplicate = async (popup: typeof popups[0]) => {
    const newPopup = await duplicatePopup(popup);
    if (newPopup) {
      toast({
        title: "Popup duplicated",
        description: "A copy has been created.",
      });
    }
  };

  const totalViews = popups.reduce((acc, p) => acc + p.views, 0);
  const totalClicks = popups.reduce((acc, p) => acc + p.clicks, 0);
  const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your popups</p>
            </div>
            <Link to="/create" className="w-full sm:w-auto">
              <Button variant="default" className="gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Create New
              </Button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-3xl mb-2">👀</div>
              <div className="text-3xl font-bold text-foreground">
                {totalViews.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Views</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-3xl mb-2">🖱️</div>
              <div className="text-3xl font-bold text-foreground">
                {totalClicks.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Clicks</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-3xl font-bold text-gradient">
                {conversionRate}%
              </div>
              <div className="text-muted-foreground">Conversion Rate</div>
            </div>
          </div>

          {/* Upgrade Prompt for Free Plan */}
          {profile?.plan === 'free' && (
            <UpgradePrompt popupCount={popups.length} popupLimit={1} />
          )}

          {/* Popups List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Your Popups</h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading your popups...</p>
              </div>
            ) : popups.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No popups yet</h3>
                <p className="text-muted-foreground mb-6">Create your first wake-up call popup</p>
                <Link to="/create">
                  <Button variant="default">Create Popup</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {popups.map((popup) => (
                  <div key={popup.id} className="p-4 sm:p-6 hover:bg-secondary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                          {popup.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {popup.title || "Untitled Popup"}
                          </h3>
                          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3" />
                              {popup.views} views
                            </span>
                            <span>{popup.clicks} clicks</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {popup.active ? "Active" : "Inactive"}
                          </span>
                          <Switch
                            checked={popup.active}
                            onCheckedChange={() => toggleActive(popup.id, popup.active)}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDuplicate(popup)}
                            title="Duplicate"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                          >
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Link to={`/create?edit=${popup.id}`}>
                            <Button variant="ghost" size="icon" title="Edit" className="h-8 w-8 sm:h-10 sm:w-10">
                              <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(popup.id)}
                            title="Delete"
                            className="text-destructive hover:text-destructive h-8 w-8 sm:h-10 sm:w-10"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

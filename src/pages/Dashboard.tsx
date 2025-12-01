import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Copy, Pencil, Trash2, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Popup {
  id: string;
  title: string;
  icon: string;
  active: boolean;
  views: number;
  clicks: number;
}

const mockPopups: Popup[] = [
  {
    id: "1",
    title: "Exit Intent Offer",
    icon: "⚠️",
    active: true,
    views: 1250,
    clicks: 312,
  },
  {
    id: "2",
    title: "Flash Sale Alert",
    icon: "🔥",
    active: false,
    views: 890,
    clicks: 156,
  },
  {
    id: "3",
    title: "Newsletter Signup",
    icon: "💌",
    active: true,
    views: 2100,
    clicks: 420,
  },
];

const Dashboard = () => {
  const [popups, setPopups] = useState<Popup[]>(mockPopups);

  const toggleActive = (id: string) => {
    setPopups(popups.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
    toast({
      title: "Status updated",
      description: "Popup status has been changed.",
    });
  };

  const deletePopup = (id: string) => {
    setPopups(popups.filter(p => p.id !== id));
    toast({
      title: "Popup deleted",
      description: "The popup has been removed.",
    });
  };

  const duplicatePopup = (popup: Popup) => {
    const newPopup = {
      ...popup,
      id: crypto.randomUUID(),
      title: `${popup.title} (Copy)`,
      views: 0,
      clicks: 0,
    };
    setPopups([...popups, newPopup]);
    toast({
      title: "Popup duplicated",
      description: "A copy has been created.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your popups</p>
            </div>
            <Link to="/create">
              <Button variant="default" className="gap-2">
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
                {popups.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Views</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-3xl mb-2">🖱️</div>
              <div className="text-3xl font-bold text-foreground">
                {popups.reduce((acc, p) => acc + p.clicks, 0).toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Clicks</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-3xl font-bold text-gradient">
                {((popups.reduce((acc, p) => acc + p.clicks, 0) / popups.reduce((acc, p) => acc + p.views, 0)) * 100).toFixed(1)}%
              </div>
              <div className="text-muted-foreground">Conversion Rate</div>
            </div>
          </div>

          {/* Popups List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Your Popups</h2>
            </div>
            
            {popups.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">💩</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No popups yet</h3>
                <p className="text-muted-foreground mb-6">Create your first wake-up call popup</p>
                <Link to="/create">
                  <Button variant="default">Create Popup</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {popups.map((popup) => (
                  <div key={popup.id} className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                        {popup.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{popup.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            {popup.views} views
                          </span>
                          <span>{popup.clicks} clicks</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {popup.active ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={popup.active}
                          onCheckedChange={() => toggleActive(popup.id)}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => duplicatePopup(popup)}
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Link to={`/create?edit=${popup.id}`}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePopup(popup.id)}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-xl">💩</span>
          </div>
          <span className="text-xl font-bold text-foreground">PoopUp</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="default" size="sm" className="gap-2">
              <Zap className="w-4 h-4" />
              Create Popup
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

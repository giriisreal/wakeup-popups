import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const PricingPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">Pricing</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
            Make your product a no-brainer purchase
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Appetizer */}
          <div className="bg-card rounded-3xl p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-2">Appetizer</h3>
            <p className="text-muted-foreground mb-6">Start with a taste of PoopUp</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-muted-foreground line-through text-lg">$18</span>
              <span className="text-5xl font-extrabold text-foreground">$9</span>
              <span className="text-muted-foreground">USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                Unlimited PoopUps
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                1 website
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                Simple analytics
              </li>
            </ul>

            <Link to="/create">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg gap-2">
                Get PoopUp
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Pay once. Access forever.
            </p>
          </div>

          {/* Main Course */}
          <div className="relative bg-card rounded-3xl p-8 shadow-card border-2 border-primary/20">
            {/* Popular badge */}
            <div className="absolute -top-3 right-8 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              POPULAR
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Main Course</h3>
            <p className="text-muted-foreground mb-6">Add PoopUps to all your websites, let's go!</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-muted-foreground line-through text-lg">$38</span>
              <span className="text-5xl font-extrabold text-foreground">$19</span>
              <span className="text-muted-foreground">USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                Unlimited PoopUps
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                <span><span className="bg-muted px-2 py-0.5 rounded">Unlimited</span> websites</span>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                Simple analytics
              </li>
            </ul>

            <Link to="/create">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg gap-2">
                Get PoopUp
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Pay once. Access forever.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          *With great power comes great responsibility. Use PoopUp responsibly.
        </p>
      </div>
    </section>
  );
};

export default PricingPreview;
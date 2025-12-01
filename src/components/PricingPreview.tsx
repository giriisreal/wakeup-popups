import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const PricingPreview = () => {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Pay once. Get lifetime access. No subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Appetizer */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all">
            <div className="text-3xl mb-4">🍟</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Appetizer</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-foreground">$9</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Up to 3 popups
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Basic analytics
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                All icon styles
              </li>
            </ul>
            <Link to="/pricing">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Main Course */}
          <div className="relative bg-card rounded-2xl p-8 border-2 border-primary shadow-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-hero text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Most Popular
            </div>
            <div className="text-3xl mb-4">🍔</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Main Course</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-foreground">$19</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Unlimited popups
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Priority support
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-primary" />
                Custom animations
              </li>
            </ul>
            <Link to="/pricing">
              <Button variant="default" className="w-full">
                Get Unlimited Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;

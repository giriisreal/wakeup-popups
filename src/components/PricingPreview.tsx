import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

const PricingPreview = () => {
  const { createSubscription, profile } = useSubscription();

  const handleUpgrade = async () => {
    await createSubscription();
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground">
            Simple Pricing
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-card rounded-3xl p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">Get started with Poppy</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold text-foreground">₹0</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                1 Poppy
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
              <Button className="w-full bg-muted hover:bg-muted/80 text-foreground rounded-full py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Happy Meal Plan */}
          <div className="relative bg-card rounded-3xl p-8 shadow-card border-2 border-primary">
            {/* Popular badge */}
            <div className="absolute -top-3 right-8 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              POPULAR
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Happy Meal 🎉</h3>
            <p className="text-muted-foreground mb-6">Unlimited everything!</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold text-foreground">₹100</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                <span><span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">Unlimited</span> Poppys</span>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                <span><span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">Unlimited</span> websites</span>
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-foreground" />
                Simple analytics
              </li>
            </ul>

            {profile?.plan === 'happy_meal' ? (
              <Button 
                disabled
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg"
              >
                Current Plan
              </Button>
            ) : (
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg"
              >
                Upgrade Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
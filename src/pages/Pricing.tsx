import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

const Pricing = () => {
  const { createSubscription, profile } = useSubscription();

  const handleUpgrade = async () => {
    await createSubscription();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Simple Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card rounded-3xl p-8 border-2 border-border">
              <div className="text-5xl mb-4">🆓</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Free</h2>
              <p className="text-muted-foreground mb-6">Get started with Poppy</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-foreground">₹0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">1 Poppy</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">1 website</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Simple analytics</span>
                </li>
              </ul>

              <Link to="/create">
                <Button variant="outline" size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Happy Meal Plan */}
            <div className="relative bg-card rounded-3xl p-8 border-2 border-primary shadow-glow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold">
                POPULAR
              </div>

              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Happy Meal</h2>
              <p className="text-muted-foreground mb-6">Unlimited everything!</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-foreground">₹100</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">Unlimited</span> Poppys
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">Unlimited</span> websites
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Simple analytics</span>
                </li>
              </ul>

              {profile?.plan === 'happy_meal' ? (
                <Button disabled size="lg" className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button onClick={handleUpgrade} size="lg" className="w-full">
                  Upgrade Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, X } from "lucide-react";

const plans = [
  {
    name: "Appetizer",
    emoji: "🍟",
    price: 9,
    description: "Perfect for getting started",
    features: [
      { text: "Up to 3 popups", included: true },
      { text: "Basic analytics", included: true },
      { text: "All icon styles", included: true },
      { text: "Email support", included: true },
      { text: "Custom animations", included: false },
      { text: "Priority support", included: false },
    ],
    popular: false,
  },
  {
    name: "Main Course",
    emoji: "🍔",
    price: 19,
    description: "For serious conversion optimization",
    features: [
      { text: "Unlimited popups", included: true },
      { text: "Advanced analytics", included: true },
      { text: "All icon styles", included: true },
      { text: "Priority support", included: true },
      { text: "Custom animations", included: true },
      { text: "A/B testing", included: true },
    ],
    popular: true,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Lifetime Access</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pay once. Get lifetime access. No hidden fees. No subscriptions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-3xl p-8 border-2 transition-all hover:-translate-y-2 ${
                  plan.popular
                    ? "border-primary shadow-glow"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-hero text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className="text-5xl mb-4">{plan.emoji}</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h2>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/create">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    Get {plan.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-card rounded-2xl px-6 py-4 border border-border">
              <span className="text-3xl">🛡️</span>
              <div className="text-left">
                <div className="font-bold text-foreground">30-day money-back guarantee</div>
                <div className="text-sm text-muted-foreground">Not happy? Get a full refund, no questions asked.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

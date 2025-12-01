import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Small label */}
          <p className="text-muted-foreground mb-4 animate-slide-up">
            Poppy in action
            <span className="inline-block ml-2">👆</span>
          </p>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-2 animate-slide-up leading-tight" style={{ animationDelay: "0.1s" }}>
            Turn visitors into customers
            <span className="inline-block ml-2 text-4xl md:text-5xl lg:text-6xl">🤑</span>
          </h1>
          <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <span className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground underline-dots pb-4 inline-block">
              with wake-up call popups
            </span>
          </div>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Delivers impactful and attention-grabbing pop-up notifications to confront website visitors with the harsh realities, driving engagement and conversions.
          </p>

          {/* Benefits list */}
          <div className="flex flex-col items-center gap-2 mb-10 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2 text-foreground">
              <Check className="w-5 h-5 text-green-600" />
              <span>Pay once, use forever</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Check className="w-5 h-5 text-green-600" />
              <span>1-minute no-code setup</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Check className="w-5 h-5 text-green-600" />
              <span>Increase conversion rate</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/create">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full gap-2">
                Get Poppy
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Testimonial badge */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground rounded-full px-5 py-3">
              <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                  alt="Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">This is so clever 👏</p>
                <p className="text-xs opacity-80">Guillermo R. — Vercel CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
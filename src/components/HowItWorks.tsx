import { PenLine, Smile, Code } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    emoji: "✍️",
    title: "Write your message",
    description: "Address your visitor's #1 pain point with a bold, attention-grabbing headline.",
  },
  {
    icon: Smile,
    emoji: "🎭",
    title: "Trigger emotion",
    description: "Choose from our library of impactful icons to create urgency and drive action.",
  },
  {
    icon: Code,
    emoji: "🔧",
    title: "Embed & go live",
    description: "Copy one line of code, paste it into your site, and start converting visitors.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your first popup in under 60 seconds. No coding skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {step.emoji}
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-border/50">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

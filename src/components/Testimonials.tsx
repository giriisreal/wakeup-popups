import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "E-commerce Owner",
    avatar: "👩‍💼",
    content: "My conversion rate jumped 47% in the first week. These popups actually work!",
    rating: 5,
  },
  {
    name: "Jake T.",
    role: "SaaS Founder",
    avatar: "👨‍💻",
    content: "Finally, popups that don't look like spam from 2005. My visitors actually engage now.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "Course Creator",
    avatar: "👩‍🏫",
    content: "Setup took literally 2 minutes. The ROI was insane - 3x more signups!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by makers
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of websites already using PoopUp
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 text-lg">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

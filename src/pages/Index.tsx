import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingPreview from "@/components/PricingPreview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Will this work on mobile?",
    answer: "Absolutely! All our popups are fully responsive and look great on any device - desktop, tablet, or mobile. We've optimized the experience for touch screens too.",
  },
  {
    question: "Do I need to know how to code?",
    answer: "Nope! That's the whole point of Poppy. You just copy one line of code and paste it into your website. If you can copy and paste, you can use Poppy.",
  },
  {
    question: "Can I use this with Shopify, Wix, WordPress, etc.?",
    answer: "Yes! Poppy works with any website builder or platform. As long as you can add a script tag to your site's header, you're good to go. This includes Shopify, Wix, WordPress, Squarespace, Webflow, and plain HTML sites.",
  },
  {
    question: "How do I install the popup on my site?",
    answer: "After creating your popup, you'll get a single line of code. Just paste it into your website's <head> section. Most website builders have a dedicated area for adding custom scripts. If you get stuck, we have step-by-step guides for every major platform.",
  },
  {
    question: "Will this slow down my website?",
    answer: "Not at all! Our script is incredibly lightweight (under 5KB) and loads asynchronously, meaning it won't affect your page load speed. Your visitors won't notice any difference.",
  },
  {
    question: "Can I customize the popup design?",
    answer: "Yes! You can customize the colors, text, icons, buttons, and animations. We've made it super easy to match your brand while keeping that attention-grabbing impact.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="pricing">
          <PricingPreview />
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-2xl border border-border px-6 data-[state=open]:border-primary/50"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Still have questions */}
            <div className="mt-12 sm:mt-16 text-center px-4">
              <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border max-w-xl mx-auto">
                <div className="text-4xl sm:text-5xl mb-4">💬</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Still have questions?</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  Can't find what you're looking for? Drop us a message and we'll get back to you.
                </p>
                <a href="mailto:iamgirikrishna@gmail.com">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base">
                    Contact Support
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
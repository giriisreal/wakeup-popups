import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  {
    question: "What's the difference between Appetizer and Main Course?",
    answer: "Appetizer gives you up to 3 popups with basic analytics - perfect for testing the waters. Main Course gives you unlimited popups, advanced analytics, A/B testing, custom animations, and priority support - ideal for serious conversion optimization.",
  },
  {
    question: "Is there a free trial?",
    answer: "We don't offer a free trial, but we do have a 30-day money-back guarantee. If you're not happy with Poppy for any reason, just reach out and we'll refund you - no questions asked.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 30-day money-back guarantee. If Poppy isn't working out for you, just email us and we'll process your refund promptly.",
  },
  {
    question: "Can I see analytics for my popups?",
    answer: "Absolutely! You can track views, clicks, and conversion rates for each popup right from your dashboard. Main Course users also get advanced analytics including heatmaps and A/B test results.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
          <div className="mt-16 text-center">
            <div className="bg-card rounded-3xl p-8 border border-border max-w-xl mx-auto">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Drop us a message and we'll get back to you.
              </p>
              <a href="mailto:iamgirikrishna@gmail.com">
                <button className="bg-gradient-hero text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all">
                  Contact Support
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

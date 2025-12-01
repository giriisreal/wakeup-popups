const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            97% of visitors aren't ready to buy
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl opacity-80 mb-16">
            All the time and money spent on ads, SEO, and content marketing goes to waste. Potential customers leave and never come back.
          </p>

          {/* Steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">🤯</div>
              <p className="font-semibold">Potential customer is</p>
              <p className="font-semibold">interested</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-3xl opacity-50 rotate-0">
              ⟶
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">😕</div>
              <p className="font-semibold">Doesn't find a reason to</p>
              <p className="font-semibold">buy <span className="underline">right now</span></p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-3xl opacity-50">
              ⟶
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">😬</div>
              <p className="font-semibold">Leaves and never</p>
              <p className="font-semibold">comes back</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
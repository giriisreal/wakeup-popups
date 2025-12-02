const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 px-2">
            97% of visitors aren't ready to buy
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl opacity-80 mb-12 sm:mb-16 px-4">
            All the time and money spent on ads, SEO, and content marketing goes to waste. Potential customers leave and never come back.
          </p>

          {/* Steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="text-4xl sm:text-5xl mb-4">🤯</div>
              <p className="font-semibold text-sm sm:text-base">Potential customer is</p>
              <p className="font-semibold text-sm sm:text-base">interested</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-2xl sm:text-3xl opacity-50 rotate-0">
              ⟶
            </div>
            <div className="md:hidden text-2xl opacity-50 rotate-90">
              ⟶
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="text-4xl sm:text-5xl mb-4">😕</div>
              <p className="font-semibold text-sm sm:text-base">Doesn't find a reason to</p>
              <p className="font-semibold text-sm sm:text-base">buy <span className="underline">right now</span></p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-2xl sm:text-3xl opacity-50">
              ⟶
            </div>
            <div className="md:hidden text-2xl opacity-50 rotate-90">
              ⟶
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="text-4xl sm:text-5xl mb-4">😬</div>
              <p className="font-semibold text-sm sm:text-base">Leaves and never</p>
              <p className="font-semibold text-sm sm:text-base">comes back</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
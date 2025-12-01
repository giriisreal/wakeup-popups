const useCases = [
  {
    title: "Habit tracker",
    description: "Remind your visitors of the pain of not sticking to their habits",
    popup: {
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face",
      name: "Gym Chad",
      message: "Still in couch?"
    }
  },
  {
    title: "Analytics Tool",
    description: "Express the sting of not growing a business",
    popup: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/200px-X_logo_2023.svg.png",
      name: "Twitter Revenue in May: $0",
      message: "Consider a career shift"
    }
  },
  {
    title: "Subscription Reminder",
    description: "Show the consequence of forgetting to cancel subscriptions",
    popup: {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Wise_symbol_2023.svg/200px-Wise_symbol_2023.svg.png",
      name: "❌ Balance: -$1,242.00",
      message: "Another subscription you forgot to cancel"
    }
  }
];

const UseCases = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Use cases
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            There are millions of ways to agitate a problem and drive action. Here are examples of 3 products:
          </p>
        </div>

        {/* Use cases */}
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-card">
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                {/* Left side - Text */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>

                {/* Right side - Popup preview */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={useCase.popup.image} 
                        alt={useCase.popup.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground truncate">
                        {useCase.popup.name}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {useCase.popup.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
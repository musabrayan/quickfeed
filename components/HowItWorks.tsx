function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-muted text-primary font-bold flex items-center justify-center text-xl mb-4 shadow-sm border border-border">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="text-center mt-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-primary tracking-tight">
        How Quickfeed Works
      </h2>
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <HowItWorksStep
            number={1}
            title="Create Your Account"
            description="Set up your Quickfeed profile in just a few clicks—no tech skills needed."
          />
          <HowItWorksStep
            number={2}
            title="Embed & Collect"
            description="Drop our widget into your site and start gathering useful feedback instantly."
          />
          <HowItWorksStep
            number={3}
            title="Make Feedback Count"
            description="Turn responses into insights and showcase them to boost your credibility and growth."
          />
        </div>
      </div>
    </section>
  );
}

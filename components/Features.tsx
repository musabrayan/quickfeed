'use client';

import {
  BarChart,
  Bot,
  Download,
  Eye,
  MonitorSmartphone,
  Rows2,
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Insights',
    description:
      'Let AI do the heavy lifting—instantly generate summaries from raw feedback and uncover patterns that matter.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Plug & Play Widget',
    description:
      'Drop in our widget with just a few lines of code. It’s fast, light, and blends into your site effortlessly.',
  },
  {
    icon: Rows2,
    title: 'Public Feedback Marque',
    description:
      'Put your user voices on display—build trust and transparency by showcasing genuine testimonials.',
  },
  {
    icon: BarChart,
    title: 'Smart Categorization',
    description:
      'Group feedback by type, sentiment, or topic to make analysis and decision-making easier.',
  },
  {
    icon: Download,
    title: '1-Click Export',
    description:
      'Download all feedback in clean CSV format for reports, audits, or offline review.',
  },
  {
    icon: Eye,
    title: 'Custom Visibility',
    description:
      'Choose what feedback stays visible and what stays private—full control at your fingertips.',
  },
];

export default function Features() {
  return (
    <section className="mt-24 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold tracking-tight text-primary">
          Why QuickFeed?
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          From collection to presentation QuickFeed makes gathering, organizing, and showing feedback beautifully simple.
        </p>
      </div>

      <div className="text-center mb-12">
        <h3 className="text-xl font-semibold tracking-tight text-primary">
          Powerful, Purpose-Built Features
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="rounded-xl border border-border shadow-md p-6 bg-card text-card-foreground transition hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-muted rounded-lg text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-md font-semibold text-primary">{title}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

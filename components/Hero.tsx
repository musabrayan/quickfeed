'use client'

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, Code, Star,} from 'lucide-react';
import BadgeButton from './ui/badge-button';
import Features from './Features';

export default function Hero() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session?.user) {
      router.push('/projects');
    } else {
      router.push('/signin');
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <BadgeButton />

      <h1 className="text-5xl font-bold mb-4 text-center flex flex-col gap-1">
        Show What People Really Think
        <span>Turn Insights into Big Wins 🚀</span>
      </h1>

      <p className="text-lg text-muted-foreground mb-6 text-center max-w-md">
        Seamlessly add a feedback tool to your site, highlight honest opinions, and unlock powerful growth—effortlessly.
      </p>

      <button
        onClick={handleGetStarted}
        className="px-6 py-3 rounded-full border border-input hover:cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition flex items-center gap-2 mb-10"
      >
        Get Started
        <ArrowRight className="w-4 h-4" />
      </button>


      <div className="flex flex-col sm:flex-row justify-center items-center gap-15 text-center">
        <div className="flex flex-col items-center">
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">AI Insights</span>
        </div>
        <div className="flex flex-col items-center">
          <Code className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">Easy Integration</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="w-6 h-6 mb-1" />
          <span className="text-sm font-medium">Get Feedback</span>
        </div>
      </div>

      <Features/>
    </main>

    
  );
}

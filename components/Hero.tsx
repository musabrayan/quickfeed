'use client'

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, Code, Star,} from 'lucide-react';
import BadgeButton from './ui/badge-button';
import Features from './Features';
import HowItWorks from './HowItWorks';
import { DemoFeedbacks } from './DemoFeedbacks';
import CommonQuestions from './Accordian';

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
<main className="min-h-screen flex flex-col justify-center items-center px-4 py-12 scroll-smooth">
  <BadgeButton />

  {/* Hero Text */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
    Show What People Really Think
    <span className="block text-xl sm:text-2xl md:text-3xl font-semibold mt-2">
      Turn Insights into Big Wins 🚀
    </span>
  </h1>

  {/* Subheading */}
  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 text-center max-w-md">
    Seamlessly add a feedback tool to your site, highlight honest opinions, and unlock powerful growth—effortlessly.
  </p>

  {/* CTA Button */}
  <button
    onClick={handleGetStarted}
    className="px-6 py-3 text-sm md:text-base rounded-full border border-input hover:cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition flex items-center gap-2 mb-10"
  >
    {session?.user ? 'Go to Projects' : 'Get Started'}
    <ArrowRight className="w-4 h-4" />
  </button>

  {/* Features Section - Always Row */}
  <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 text-center">
    <div className="flex flex-col items-center min-w-[100px]">
      <BarChart3 className="w-6 h-6 mb-1" />
      <span className="text-sm font-medium">AI Insights</span>
    </div>
    <div className="flex flex-col items-center min-w-[100px]">
      <Code className="w-6 h-6 mb-1" />
      <span className="text-sm font-medium">Easy Integration</span>
    </div>
    <div className="flex flex-col items-center min-w-[100px]">
      <Star className="w-6 h-6 mb-1" />
      <span className="text-sm font-medium">Get Feedback</span>
    </div>
  </div>
      <Features/>
      <HowItWorks/>
  
<div className="mt-20 w-full text-center">
  <div className="px-4 max-w-7xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-medium text-primary">
      Experience QuickFeed in Action
    </h2>
    <p className="text-base sm:text-lg mt-4 mx-auto w-full sm:w-3/4 md:w-1/2 text-muted-foreground">
      Dive into the live preview and see how Feed-Wall effortlessly enhances how you gather and showcase feedback.
    </p>
  </div>
  <div className="mt-6 w-full overflow-hidden">
    <DemoFeedbacks />
  </div>
</div>


<div className="mt-20 px-4 w-full text-center">
  <h2 className="text-2xl sm:text-3xl font-medium text-primary">
    FAQs
  </h2>
  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
    Got questions? Here's what people often ask about Quickfeed.
  </p>
  <div className="mt-6 text-left">
    <CommonQuestions />
  </div>
</div>
<div className="text-center mt-20 max-w-7xl mx-auto mb-8">
  <h2 className="text-2xl sm:text-3xl font-medium text-primary">
    Ready to Level Up Your Feedback Game?
  </h2>
  <p className="text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto text-muted-foreground px-4">
    Start your journey to better user insights with Quickfeed — embed, collect, and grow effortlessly.
  </p>
  <div className="flex justify-center mt-8">
    <Link
      href="/signin"
      className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
    >
      Create your account
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</div>

    </main>

    
  );
}

// DemoFeedbacks.tsx

import { cn } from '@/lib/utils';
import { Marquee } from '@/components/ui/marquee';

const reviews = [
  {
    name: 'Sanya Rao',
    username: '@sanyarao',
    body: 'Quickfeed was a breeze to embed. Love how feedback is neatly categorized—makes everything easier to process.',
    img: 'https://avatar.vercel.sh/sanyarao',
  },
  {
    name: 'Vikram Joshi',
    username: '@vikramjoshi',
    body: 'Very handy widget! Would be even better with more options for CSV customization.',
    img: 'https://avatar.vercel.sh/vikramjoshi',
  },
  {
    name: 'Ananya',
    username: '@ananya',
    body: 'Displaying feedback on my site was never this easy. It adds so much authenticity to my brand!',
    img: 'https://avatar.vercel.sh/ananya',
  },
  {
    name: 'Amit Patel',
    username: '@amitpatel',
    body: 'Great export feature! I had minor hiccups managing visibility, but overall a solid tool.',
    img: 'https://avatar.vercel.sh/amitpatel',
  },
  {
    name: 'Kunal Gupta',
    username: '@kunalgupta',
    body: 'AI summaries are insightful! Would love a more beginner-friendly setup experience though.',
    img: 'https://avatar.vercel.sh/kunalgupta',
  },
  {
    name: 'Arjun Verma',
    username: '@arjunverma',
    body: 'Fantastic for gathering feedback. The summaries are spot on, but UI could feel a bit smoother.',
    img: 'https://avatar.vercel.sh/arjunverma',
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-56 sm:w-64 md:w-72 lg:w-80 h-40 md:h-full cursor-pointer overflow-hidden rounded-xl border p-3 sm:p-4',
        'border-border bg-card hover:bg-muted transition-colors shadow-sm'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={`Avatar of ${name}`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-muted-foreground">
        {body}
      </blockquote>
    </figure>
  );
};

export function DemoFeedbacks() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-background py-2 sm:py-4 md:py-6 shadow-md">
      <Marquee className="px-1 sm:px-2 md:px-4 [--duration:40s] space-x-2 sm:space-x-4">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 sm:w-1/4 md:w-1/3 bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 sm:w-1/4 md:w-1/3 bg-gradient-to-l from-background to-transparent"></div>
    </section>
  );
}

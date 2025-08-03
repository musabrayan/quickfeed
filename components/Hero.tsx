// app/page.tsx or pages/index.tsx
import Link from 'next/link';

export default function Hero() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to Feed-Wall
      </h1>
      <p className="text-lg text-muted-foreground mb-6 text-center max-w-md">
        Collect and display genuine user feedback with ease.
      </p>
      <Link
        href="/signin"
        className="px-6 py-3 rounded-full border border-input hover:bg-accent hover:text-accent-foreground transition"
      >
        Get Started
      </Link>
    </main>
  );
}

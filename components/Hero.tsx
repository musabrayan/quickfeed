// app/page.tsx or pages/index.tsx (depending on your setup)
import Link from 'next/link';

export default function Hero() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to Feed-Wall
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        Collect and display genuine user feedback with ease.
      </p>
      <Link
        href="/signin"
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </main>
  );
}

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { NEXT_AUTH } from '@/lib/auth';

// Get current user session data
export const GET = async () => {
  try {
    // Retrieve the current session
    const session = await getServerSession(NEXT_AUTH);

    // Return user data if session exists
    if (session?.user) {
      return NextResponse.json({
        user: session.user,
      });
    }
  } catch (e: unknown) {
    // Handle known Error instances
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: e.message,
        },
        {
          status: 403,
        }
      );
    }

    // Fallback for unknown error types
    return NextResponse.json(
      {
        error: 'An unknown error occurred',
      },
      {
        status: 403,
      }
    );
  }

  // Return error if no session found
  return NextResponse.json(
    {
      message: 'You are not logged in',
    },
    {
      status: 403,
    }
  );
};

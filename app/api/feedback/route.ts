import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for validating feedback data structure
const feedbackSchema = z.object({
  name: z.string(),
  email: z.email(),
  feedback: z.string(),
  rating: z.number().int().min(1).max(5),
  projectid: z.number(),
});

// Handle POST requests to submit feedback
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const feedback = await req.json();
    
    // Validate the feedback data against schema
    const parsedFeedback = feedbackSchema.safeParse(feedback);

    if (!parsedFeedback.success) {
      return NextResponse.json(
        { error: 'Invalid feedback' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Save feedback to database
    await prisma.feedback.create({
      data: {
        name: parsedFeedback.data.name,
        email: parsedFeedback.data.email,
        feedback: parsedFeedback.data.feedback,
        rating: parsedFeedback.data.rating,
        projectid: parsedFeedback.data.projectid,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Feedback submitted successfully',
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (err: unknown) {
    // Handle known Error instances
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Fallback for unknown error types
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

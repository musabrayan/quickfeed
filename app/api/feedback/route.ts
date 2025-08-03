import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  feedback: z.string(),
  rating: z.number().int().min(1).max(5),
  projectid: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const feedback = await req.json();
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
    const submittedFeedback = await prisma.feedback.create({
      data: {
        name: parsedFeedback.data.name,
        email: parsedFeedback.data.email,
        feedback: parsedFeedback.data.feedback,
        rating: parsedFeedback.data.rating,
        projectid: parsedFeedback.data.projectid,
      },
    });

    console.log(submittedFeedback);
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
  } catch (err: any) {
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
}

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

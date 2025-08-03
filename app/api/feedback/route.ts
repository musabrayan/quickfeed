import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  feedback: z.string().min(1, 'Feedback is required'),
  rating: z.number().min(1).max(5),
  projectid: z.number().positive('Valid project ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validatedData = feedbackSchema.parse(body);
    
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectid }
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Create the feedback
    const feedback = await prisma.feedback.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        feedback: validatedData.feedback,
        rating: validatedData.rating,
        projectid: validatedData.projectid,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Feedback submitted successfully',
        feedback: {
          id: feedback.id,
          name: feedback.name,
          rating: feedback.rating,
          createdAt: feedback.createdAt
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating feedback:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS for the widget
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

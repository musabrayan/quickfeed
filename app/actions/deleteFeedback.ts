'use server';

import prisma from '@/lib/db';

/**
 * Server action to delete feedback by ID
 * @param id - Feedback ID to delete
 */
export const deleteFeedback = async (id: number) => {
  try {
    // Remove feedback from database
    await prisma.feedback.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

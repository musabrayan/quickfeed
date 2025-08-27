"use server"
import prisma from '@/lib/db';

/**
 * Server action to fetch all feedbacks for a specific project
 * @param id - Project ID to fetch feedbacks for
 * @returns Array of feedback objects or null if none found
 */
export default async function fetchAllFeedbacks(id: number) {
  try {
    // Get all feedbacks for the specified project
    const feedbacks = await prisma.feedback.findMany({
      where: {
        projectid: id,
      },
    });
    if (!feedbacks) {
      return null;
    }
    return feedbacks;
  } catch (err) {
    console.error(err);
  }
}

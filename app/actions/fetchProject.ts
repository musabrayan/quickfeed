'use server';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

/**
 * Server action to fetch project name by ID
 * @param id - Project ID to fetch name for
 * @returns Project name or redirects to error page if not found
 */
export default async function fetchProjectName(id: number) {
  // Check if project exists
  const isValidID = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  if (!isValidID) {
    return redirect('/error');
  }
  
  // Get project name
  const projectName = await prisma.project.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });
  return projectName?.name;
}

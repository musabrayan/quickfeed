'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

/**
 * Server action to delete a project for authenticated users
 * @param id - Project ID to delete
 */
export const deleteProject = async (id: number) => {
    try {
        // Check if user is authenticated
        const session = await getServerSession();
        if (!session?.user) {
            throw new Error('You must be logged in to delete a project');
        }
        const userId = session.user.email;
        if (!userId) {
            throw new Error('User not found');
        }
        
        // Find user in database
        const findUser = await prisma.user.findUnique({
            where: {
                email: userId as string,
            },
        });
        if (!findUser) {
            throw new Error('User not found');
        }

        // Delete project from database (only if user owns it)
        const project = await prisma.project.delete({
            where: {
                id: id,
                userId: findUser.id,
            },
        });
        if (!project) {
            throw new Error('Project not found');
        }
    } catch (error) {
        console.error(error);
    }
};

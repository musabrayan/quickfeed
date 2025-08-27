'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

// Schema for validating project input data
const schema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
});

/**
 * Server action to create a new project for authenticated users
 * @param name - Project name
 * @param description - Project description
 * @param url - Project URL
 * @returns Created project object
 */
export const createNewProject = async (
    name: string,
    description: string,
    url: string
) => {
    // Check if user is authenticated
    const session = await getServerSession();
    if (!session?.user) {
        throw new Error('You must be logged in to create a project');
    }
    const userId = session.user.email;

    try {
        // Find user in database
        const findUser = await prisma.user.findUnique({
            where: {
                email: userId as string,
            },
        });
        if (!findUser) {
            throw new Error('User not found');
        }
        
        // Validate input data
        const parse = schema.safeParse({ name, description, url });
        if (!parse.success) {
            throw new Error('Invalid input');
        }
        
        // Create new project in database
        const project = await prisma.project.create({
            data: {
                name: parse.data.name,
                description: parse.data.description,
                url: parse.data.url,
                userId: findUser.id,
            },
        });
        if (!project) {
            throw new Error('Project not created');
        }

        return project;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the project');
    }
};

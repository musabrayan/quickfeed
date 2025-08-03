import ProjectDialog from '@/components/ProjectDialog';
import ProjectCards from '@/components/ProjectCards';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }
  const user = session?.user;
  const projects = await prisma.project.findMany({
    where: {
      user: {
        email: user?.email,
      },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-primary">Quick</span>Feed Projects
            </h1>
            <p className="text-muted-foreground text-lg mt-2 max-w-2xl mx-auto">
              Create and manage your projects to gather valuable feedback from the community
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <ProjectDialog>
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 cursor-pointer hover:bg-muted/80 transition-colors">
                <Plus className="w-12 h-12 text-muted-foreground" />
              </div>
            </ProjectDialog>
            <h3 className="text-2xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get started by creating your first project and start collecting feedback
            </p>
          </div>
        ) : (
          /* Projects Grid */
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Your Projects</h2>
                <p className="text-muted-foreground">
                  {projects.length} project{projects.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ProjectDialog>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </ProjectDialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCards
                  key={project.id}
                  project={{ ...project, id: project.id.toString() }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

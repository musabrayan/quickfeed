import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsProps {
  tab1Content: React.ReactNode;
  tab2Content: React.ReactNode;
}

export function CodeSnippet({ tab1Content, tab2Content }: TabsProps) {
  return (
    <Tabs defaultValue="Html" className="overflow-hidden max-h-full">
      <TabsList className="flex w-full justify-start border bg-background">
        <TabsTrigger
          value="Html"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:rounded-none flex items-center hover:text-primary/80 transition-colors"
        >
          Html
        </TabsTrigger>
        <TabsTrigger
          value="Nextjs"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:rounded-none flex items-center hover:text-primary/80 transition-colors"
        >
          Next.js
        </TabsTrigger>
      </TabsList>
      <div className="max-h-full bg-background">
        <TabsContent
          className="p-4 max-h-full overflow-auto w-full bg-card text-card-foreground"
          value="Html"
        >
          {tab1Content}
        </TabsContent>
        <TabsContent
          className="p-4 max-h-full overflow-auto w-full bg-card text-card-foreground"
          value="Nextjs"
        >
          {tab2Content}
        </TabsContent>
      </div>
    </Tabs>
  );
}

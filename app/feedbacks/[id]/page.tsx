'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CSVLink } from 'react-csv';
import {
  Search,
  Download,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  Code2,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import fetchProjects from '@/app/actions/fetchProject';
import fetchAllFeedbacks from '@/app/actions/fetchAllFeedbacks';
import { AISummary } from '@/app/actions/generateSummary';
import { CodeSnippet } from '@/components/CodeSnippet';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { MarqueeSelector } from '@/components/FeedbackMarque';
import { deleteFeedback } from '@/app/actions/deleteFeedback';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Feedback {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  feedback: string;
  rating: number;
  projectid: number;
}

export default function Page() {
  const route = useRouter();
  const session = useSession();
  const { id } = useParams();
  const [project, setProject] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[] | null>(
    null
  );
  const [summary, setSummary] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'date'>('date');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [santizedSummary, setSantizedSummary] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Redirect to signin if user is not authenticated
  useEffect(() => {
    if (!session.data?.user) {
      route.push('/signin');
    }
  }, [session, route]);

  const feedbacksPerPage = 4;

  // Generate AI summary for feedback data
  async function getSummary(feedbacks: Feedback[] | null) {
    if (feedbacks) {
      if (!session.data?.user) {
        return null;
      }

      setIsSummaryLoading(true);

      if (feedbacks.length === 0) {
        setSummary('<h1>no summary</h1>');
      } else {
        const summary = await AISummary(feedbacks);
        if (summary) {
          setSummary(summary);
          const temp = await marked(summary);
          setSantizedSummary(temp);
        }
      }
      setIsSummaryLoading(false);
    }
  }

  // Fetch project name and feedbacks on component mount
  useEffect(() => {
    async function fetchProjectName() {
      if (id) {
        const projectName = await fetchProjects(Number(id));
        const Feedbacks = await fetchAllFeedbacks(Number(id));

        if (projectName !== undefined) {
          setProject(projectName);
        }
        if (Feedbacks !== undefined) {
          setFeedbacks(Feedbacks);
          setFilteredFeedbacks(Feedbacks);
        }
        setIsDataLoading(false);
      }
    }
    fetchProjectName();
  }, [id]);

  // Filter and sort feedbacks based on search term and sort preference
  useEffect(() => {
    if (feedbacks) {
      const filtered = feedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'rating') return b.rating - a.rating;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setFilteredFeedbacks(sorted);
      setCurrentPage(1);
    }
  }, [feedbacks, searchTerm, sortBy]);

  // Delete feedback and update local state
  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    await deleteFeedback(id);
    setFeedbacks((prev) =>
      prev ? prev.filter((feedback) => feedback.id !== id) : null
    );
    setIsDeleting(false);
  };

  // Calculate pagination indices
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks?.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Show loading state while fetching data
  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state if project not found
  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-foreground">Project not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          <span className="text-primary">Quick</span>
          <span className="text-foreground">feed</span>{' '}
          Dashboard
        </h1>
        <div className="mt-2 text-lg text-muted-foreground">
          Analyze and manage all feedback for {project}
        </div>
      </header>

      <Tabs defaultValue="feedbacks" className="w-full">
        <TabsList className="flex w-full overflow-x-auto ">
          <TabsTrigger value="feedbacks">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>

          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>

          <TabsTrigger value="integration">
            <Code2 className="w-4 h-4" />
            Integration
          </TabsTrigger>

          <TabsTrigger value="insights">
            <Sparkles className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedbacks" className="mt-6">
          <div className="border border-border rounded-lg bg-card p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Customer Feedback</h2>
            <div className="text-sm text-muted-foreground mb-4">
              Monitor, search, and analyze feedback from your users.
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
              <div className="flex items-center w-full">
                <Search className="w-5 h-5 text-muted-foreground mr-2" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or feedback content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-[95%]"
                />
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as 'name' | 'rating' | 'date')
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
                <CSVLink
                  data={filteredFeedbacks || []}
                  filename={`${project}_feedback_export.csv`}
                  className="flex items-center px-3 py-4 border rounded-md border-border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-9 hover:bg-accent hover:text-accent-foreground whitespace-nowrap transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Data
                </CSVLink>
              </div>
            </div>
            {currentFeedbacks && currentFeedbacks.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Customer</TableHead>
                      <TableHead className="w-[200px]">Contact</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[100px]">Score</TableHead>
                      <TableHead className="w-[100px]">Submitted</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentFeedbacks.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">
                          {feedback.name}
                        </TableCell>
                        <TableCell>{feedback.email}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {feedback.feedback}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 inline-block ${i < feedback.rating
                                ? 'text-primary fill-current'
                                : 'text-muted-foreground'
                                }`}
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-popover border-border">
                              <DialogHeader>
                                <DialogTitle className="text-popover-foreground">{feedback.name}</DialogTitle>
                                <DialogDescription>
                                  <span className="flex items-center space-x-2 my-2 pb-4">
                                    <span className="text-muted-foreground">{feedback.email}</span>
                                    <span className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 inline-block ${i < feedback.rating
                                            ? 'text-primary fill-current'
                                            : 'text-muted-foreground'
                                            }`}
                                        />
                                      ))}
                                    </span>
                                  </span>
                                  <span className="block w-full h-px bg-border my-2"></span>
                                </DialogDescription>
                              </DialogHeader>
                              <div className="text-sm space-y-2 max-h-40 overflow-y-auto">
                                <div className="text-popover-foreground">
                                  {feedback.feedback}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  Received on:{' '}
                                  {new Date(feedback.createdAt).toLocaleString()}
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  variant="outline"
                                  onClick={() => handleDelete(feedback.id)}
                                  disabled={isDeleting}
                                  size="sm"
                                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive border-destructive"
                                >
                                  {isDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Remove
                                    </>
                                  )}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Displaying {indexOfFirstFeedback + 1} to{' '}
                    {Math.min(indexOfLastFeedback, filteredFeedbacks?.length || 0)}{' '}
                    of {filteredFeedbacks?.length} feedback responses
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      size="sm"
                      variant="outline"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        indexOfLastFeedback >= (filteredFeedbacks?.length || 0)
                      }
                      size="sm"
                      variant="outline"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-lg text-muted-foreground">
                  No feedback responses yet 🌟
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Share your feedback widget to start collecting valuable insights!
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <div className="border border-border rounded-lg bg-card p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Feedback Overview</h2>
            <div className="text-sm text-muted-foreground mb-4">
              Visual representation of your feedback data and trends.
            </div>
            {feedbacks && <MarqueeSelector feedbacks={feedbacks} />}
          </div>
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <div className="border border-border rounded-lg bg-card p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Integration Code</h2>
            <div className="text-sm text-muted-foreground mb-4">
              Easily integrate Quickfeed into your website. Copy and paste the code below to start collecting feedback instantly.
            </div>
            <CodeSnippet
              tab1Content={
                <div>
                  <CodeBlock
                    code={`<head> 
<link rel="stylesheet" href="https://feedbackwidget-delta.vercel.app/feedback-widget.css"> 
</head>                  
<body>
<script type="module" src="https://feedbackwidget-delta.vercel.app/feedback-widget.js"></script>
<feedback-widget projectId=${id} websiteName=${project}></feedback-widget>
</body>`}
                    language="html"
                    filename="index.html"
                  />
                </div>
              }
              tab2Content={
                <div>
                  <CodeBlock
                    code={`"use client";
                  
import { useEffect } from 'react';

function FeedBackWidget() {
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://feedbackwidget-delta.vercel.app/feedback-widget.css';
    document.head.appendChild(link);

    // Load JavaScript
    const script = document.createElement('script');
    script.src = 'https://feedbackwidget-delta.vercel.app/feedback-widget.js';
    script.type = 'module';
    document.body.appendChild(script);

    // Cleanup function to remove elements when component unmounts
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <feedback-widget projectId="${id}" websiteName="${project}" />
    </>
  );
}

export default FeedBackWidget;`}
                    language="typescript"
                    filename="FeedBackWidget.tsx"
                  />
                </div>
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="border border-border rounded-lg bg-card p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">AI-Powered Insights</h2>
            <div className="text-sm text-muted-foreground mb-4">
              Generate intelligent summaries and insights from your customer feedback using advanced AI analysis.
            </div>
            <Button
              onClick={() => getSummary(feedbacks)}
              className="mb-4"
              disabled={isSummaryLoading || !feedbacks || feedbacks.length === 0}
            >
              {isSummaryLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing Feedback...
                </>
              ) : (
                'Generate AI Summary'
              )}
            </Button>
            {summary && (
              <div className="border border-border bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  {santizedSummary && (
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert
                      prose-headings:text-card-foreground prose-headings:font-semibold
                      prose-h1:text-2xl prose-h1:mb-6 prose-h1:pb-3 prose-h1:border-b prose-h1:border-border prose-h1:text-primary
                      prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-card-foreground prose-h2:font-medium
                      prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-muted-foreground
                      prose-p:text-card-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm
                      prose-ul:my-4 prose-ul:space-y-3 prose-li:text-card-foreground prose-li:leading-relaxed prose-li:pl-2
                      prose-strong:text-card-foreground prose-strong:font-semibold prose-strong:text-primary
                      prose-em:text-muted-foreground prose-em:italic
                      prose-hr:border-border prose-hr:my-8
                      prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-primary
                      space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                      dangerouslySetInnerHTML={{ __html: santizedSummary }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

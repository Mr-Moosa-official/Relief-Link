import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Siren, Users, Package, MessageCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | ReliefLink',
  description: 'Overview of disaster relief operations.',
};

export default function DashboardPage() {
  const summaryData = [
    {
      title: 'Active Incidents',
      icon: <Siren className="h-6 w-6 text-primary" />,
      value: '12',
      description: 'Reports requiring immediate attention.',
      link: '/incidents',
      cta: 'View Incidents',
    },
    {
      title: 'Registered Volunteers',
      icon: <Users className="h-6 w-6 text-primary" />,
      value: '247',
      description: 'Ready to be deployed.',
      link: '/volunteers',
      cta: 'Manage Volunteers',
    },
    {
      title: 'Resource Needs',
      icon: <Package className="h-6 w-6 text-primary" />,
      value: '38',
      description: 'Unfulfilled requests for supplies.',
      link: '/resources',
      cta: 'Track Resources',
    },
    {
      title: 'Team Messages',
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      value: '5',
      description: 'Unread team communications.',
      link: '/messaging',
      cta: 'Open Chat',
    },
  ];

  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Real-time overview of relief operations.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryData.map((item) => (
            <Card key={item.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold text-primary">{item.value}</div>
                  <CardDescription className="mt-2">{item.description}</CardDescription>
                </div>
                <Button asChild className="mt-4 w-full">
                  <Link href={item.link}>
                    {item.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from the field and coordination teams.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Siren className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="font-medium">New Incident: "Building Collapse"</p>
                            <p className="text-sm text-muted-foreground">Reported 5 minutes ago in Sector 4. High urgency.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Users className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="font-medium">New Volunteer: "Jane Doe"</p>
                            <p className="text-sm text-muted-foreground">Registered with paramedic skills. Awaiting assignment.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Package className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="font-medium">Resource Update: "Water Bottles"</p>
                            <p className="text-sm text-muted-foreground">AI match found: 500 units of bottled water now available for "Urgent Hydration" need.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

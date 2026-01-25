'use client';

import { useState, useEffect, useOptimistic, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { checkResourcesAction, type ActionState } from './actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { List, PackageCheck, PackagePlus, Bot, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const initialNeeds = [
  '100 units of bottled water',
  '50 blankets',
  'First-aid kits for 20 people',
  'Portable generators (3)',
  'Non-perishable food for 50 people',
];

const initialState: ActionState = {
  message: '',
  resourceFound: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Analyze and Add Resource
        </>
      )}
    </Button>
  );
}

export default function ResourcesPage() {
  const { toast } = useToast();
  const [unfulfilledNeeds, setUnfulfilledNeeds] = useState(initialNeeds);
  const [availableResources, setAvailableResources] = useState<string[]>([]);
  const [optimisticNeeds, removeOptimisticNeed] = useOptimistic(
    unfulfilledNeeds,
    (state, needToRemove: string) => state.filter((need) => need !== needToRemove)
  );
  
  const [state, formAction] = useActionState(checkResourcesAction, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.resourceFound ? 'Resource Matched!' : 'Report Update',
        description: state.message,
        variant: state.resourceFound ? 'default' : 'default',
        className: state.resourceFound ? 'bg-green-600 text-white border-green-700' : 'bg-secondary',
      });

      if (state.resourceFound && state.matchedNeed) {
        const matched = state.matchedNeed;
        removeOptimisticNeed(matched);
        setUnfulfilledNeeds((prev) => prev.filter((need) => need !== matched));
        setAvailableResources((prev) => [...prev, matched]);
      }
    }
  }, [state, toast, removeOptimisticNeed]);
  
  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
        <p className="text-muted-foreground">Track needs, manage donations, and let AI find matches.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  Unfulfilled Needs
                </CardTitle>
                <CardDescription>Resources currently requested by relief teams.</CardDescription>
              </CardHeader>
              <CardContent>
                {optimisticNeeds.length > 0 ? (
                  <ul className="space-y-3">
                    {optimisticNeeds.map((need, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="h-2 w-2 bg-primary rounded-full mr-3 shrink-0"></span>
                        {need}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">All needs are currently met!</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-green-500" />
                  Available Resources
                </CardTitle>
                <CardDescription>Confirmed and available supplies.</CardDescription>
              </CardHeader>
              <CardContent>
                {availableResources.length > 0 ? (
                  <ul className="space-y-3">
                    {availableResources.map((resource, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-3 shrink-0"></span>
                        {resource}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No resources currently available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackagePlus className="h-5 w-5" />
                Report New Resource
              </CardTitle>
              <CardDescription>Submit a report of a newly available resource.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <Textarea
                  name="report"
                  placeholder="e.g., 'A truck with 500 cases of bottled water just arrived at the main depot.' or 'Just got a donation of 25 heavy-duty blankets.'"
                  className="min-h-[120px]"
                  required
                />
                <input type="hidden" name="needs" value={JSON.stringify(unfulfilledNeeds)} />
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
